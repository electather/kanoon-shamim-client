import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Result,
  Select,
  Skeleton,
  Typography,
  Upload,
} from 'antd';
import { customSelectRenderer } from 'app/components/utils/CustomSelectRenderer';
import { debounce } from 'debounce';
import { translations } from 'locales/i18n';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ErrorResponse, Paginated, UserDataMinimal } from 'userResponse';
import {
  getBearerToken,
  getUploadedFileID,
  localizeErrorMsg,
  normFile,
  statusCodeToResultStatus,
} from 'utils';
import { formItemLayout } from 'utils/const';
import { history } from 'utils/history';
import { useDataApi } from 'utils/hooks/useDataApi';

import { alphabet } from '../../constants/alphabet';
import { createVehicle, fetchVehicle, updateVehicle } from '../../rest';

export function NewVehicleRequest() {
  const { t } = useTranslation();
  let { id } = useParams<{ id: string }>();
  const title = id ? 'ویرایش خودرو' : 'ثبت خودرو جدید';
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  const [
    { data: usersListData, isLoading: usersListLoading },
    ,
    searchUsers,
  ] = useDataApi<Paginated<UserDataMinimal>>(`users`, undefined, {
    page: 1,
    take: 20,
    order: 'DESC',
  });

  React.useEffect(() => {
    if (id) {
      const fetchVehicleData = async (id: string) => {
        try {
          const data = await fetchVehicle(id, {
            params: {
              fields: ['insurer', 'insurer.info'],
            },
          });
          form.setFieldsValue({
            insurer: data?.insurer?.id,
            ownerName: data?.ownerName,
            ownerLastName: data?.ownerLastName,
            engineNumber: data?.engineNumber,
            chassisNumber: data?.chassisNumber,
            plateFirstTwoNumbers: data?.plateFirstTwoNumbers,
            plateLetter: data?.plateLetter,
            plateLastThreeNumbers: data?.plateLastThreeNumbers,
            plateIRNumber: data?.plateIRNumber,
          });
          searchUsers({ melliCode: data?.insurer?.info?.melliCode });
        } catch (error) {
          setError(
            error?.response?.data ?? {
              message: 'لطفا اتصال خود را برسی نمایید!',
            },
          );
        }
      };
      setLoading(true);
      fetchVehicleData(id);
      setDataLoaded(true);
      setLoading(false);
    }
  }, [id, form, searchUsers]);

  const onFinish = useCallback(
    async values => {
      const { attachment, insurer, ...rest } = values;

      const payload = {
        ...rest,
        attachmentId: getUploadedFileID(attachment),
        issuerId: insurer,
      };
      setLoading(true);
      try {
        if (id) {
          const updated = await updateVehicle(id, payload);
          if (updated) {
            message.success('با موفقیت بروز رسانی شد!');
            setSuccess(true);
          }
        } else {
          const created = await createVehicle(payload);
          if (created) {
            message.success('خودرو با موفقیت ثبت شد!');
            setSuccess(true);
            form.resetFields();
          }
        }
      } catch {}
      setLoading(false);
    },
    [form, id],
  );

  const onUserSelect = useCallback(
    (_value: string | number, option: any) => {
      const { firstName, lastName } = option;
      form.setFieldsValue({ ownerName: firstName, ownerLastName: lastName });
    },
    [form],
  );

  const handleUserSearch = useCallback(
    (melliCode: string) => {
      if (melliCode) {
        searchUsers({ melliCode });
      }
    },
    [searchUsers],
  );

  if (error) {
    return (
      <Result
        status={statusCodeToResultStatus(error.statusCode)}
        title="خطایی رخ داد"
        subTitle={localizeErrorMsg(error)}
        extra={[
          <Button
            type="primary"
            key="new"
            onClick={() => history.push(`/dashboard/vehicle/info/${id}`)}
          >
            بازگشت به جزئیات خودرو
          </Button>,
          <Button
            key="list"
            onClick={() => history.push('/dashboard/vehicle/list')}
          >
            بازگشت به لیست خودرو ها
          </Button>,
        ]}
      />
    );
  }

  if (id && !dataLoaded) {
    return <Skeleton active />;
  }

  if (success) {
    return (
      <Result
        status="success"
        title="ثبت موفقیت آمیر"
        subTitle="خودرو با موفقیت در سیستم ثبت(بروز رسانی) شد. هم اکنون می توانید ادامه مراحل ثبت بیمه را انجام دهید."
        extra={[
          id ? (
            <Button
              type="primary"
              key="new"
              onClick={() => history.push(`/dashboard/vehicle/info/${id}`)}
            >
              بازگشت به جزئیات خودرو
            </Button>
          ) : (
            <Button type="primary" key="new" onClick={() => setSuccess(false)}>
              ثبت خودرو جدید
            </Button>
          ),
          <Button
            key="list"
            onClick={() => history.push('/dashboard/vehicle/list')}
          >
            بازگشت به لیست خودرو ها
          </Button>,
        ]}
      />
    );
  }
  const { form: VehicleTranslations } = translations.pages.vehicle.newTab;
  return (
    <React.Fragment>
      <Helmet title={title} />
      <Typography.Title level={4}>{title}</Typography.Title>
      <Divider />
      <Form
        {...formItemLayout}
        form={form}
        name="newInsurance"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="insurer"
          label={t(VehicleTranslations.insurer.label())}
          rules={[
            {
              required: true,
              message: t(VehicleTranslations.insurer.emptyError()),
            },
          ]}
        >
          <Select
            showSearch
            onSearch={debounce(handleUserSearch, 1000)}
            loading={usersListLoading}
            onSelect={onUserSelect}
            filterOption={(input, option) =>
              option?.melliCode?.indexOf(input) >= 0
            }
            dropdownRender={menu =>
              customSelectRenderer(menu, '/dashboard/users/new')
            }
          >
            {usersListData?.data?.map(val => (
              <Select.Option
                key={val.id}
                value={val.id}
                melliCode={val.melliCode}
                firstName={val.firstName}
                lastName={val.lastName}
              >
                کد ملی : {val.melliCode} - {val.firstName} {val.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t(VehicleTranslations.owner.label())}>
          <Input.Group compact>
            <Form.Item
              name="ownerName"
              noStyle
              rules={[
                {
                  required: true,
                  message: t(VehicleTranslations.owner.emptyError()),
                },
              ]}
            >
              <Input
                style={{ width: '50%' }}
                placeholder={t(VehicleTranslations.owner.phName())}
              />
            </Form.Item>
            <Form.Item
              name="ownerLastName"
              noStyle
              rules={[
                {
                  required: true,
                  message: t(VehicleTranslations.owner.emptyError()),
                },
              ]}
            >
              <Input
                style={{ width: '50%' }}
                placeholder={t(VehicleTranslations.owner.phLName())}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name="engineNumber"
          label={t(VehicleTranslations.engineNumber.label())}
          rules={[
            {
              required: true,
              message: t(VehicleTranslations.engineNumber.emptyError()),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="chassisNumber"
          label={t(VehicleTranslations.chassisNumber.label())}
        >
          <Input />
        </Form.Item>

        <Form.Item label={t(VehicleTranslations.plateNumber.label())}>
          <Input.Group compact>
            <Form.Item name="plateFirstTwoNumbers" noStyle>
              <InputNumber
                style={{ width: '20%' }}
                placeholder={t(VehicleTranslations.plateNumber.firstTwo())}
                min={10}
                max={99}
              />
            </Form.Item>
            <Form.Item name="plateLetter" noStyle>
              <Select
                style={{ width: '25%' }}
                showSearch
                placeholder={t(VehicleTranslations.plateNumber.letter())}
                filterOption={(input, option) =>
                  option?.children.indexOf(input) >= 0
                }
              >
                {Object.keys(alphabet).map(key => (
                  <Select.Option key={key} value={key}>
                    {alphabet[key]}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="plateLastThreeNumbers" noStyle>
              <InputNumber
                style={{ width: '30%' }}
                placeholder={t(VehicleTranslations.plateNumber.lastThree())}
                min={100}
                max={999}
              />
            </Form.Item>
            <Form.Item name="plateIRNumber" noStyle>
              <InputNumber
                style={{ width: '25%' }}
                placeholder={t(VehicleTranslations.plateNumber.irNum())}
                min={10}
                max={99}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name="address"
          label={t(VehicleTranslations.address.label())}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label={t(VehicleTranslations.attachment.label())}>
          <Form.Item
            name="attachment"
            valuePropName="attachment"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger
              name="file"
              headers={{ Authorization: getBearerToken() }}
              action={process.env.REACT_APP_BASE_URL + 'file'}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t(VehicleTranslations.attachment.guide())}
              </p>
              <p className="ant-upload-hint">
                {t(VehicleTranslations.attachment.help())}
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            icon={<CheckCircleOutlined />}
          >
            {t(VehicleTranslations.submit())}
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
