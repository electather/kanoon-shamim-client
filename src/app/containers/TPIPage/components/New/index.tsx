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
import DatePicker from 'app/components/uiElements/DatePicker';
import { customSelectRenderer } from 'app/components/utils/CustomSelectRenderer';
import dayjs from 'dayjs';
import { debounce } from 'debounce';
import { translations } from 'locales/i18n';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  ErrorResponse,
  Paginated,
  UserDataMinimal,
  VehicleResponse,
} from 'userResponse';
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

import { createTpi, fetchTpi, updateTpi } from '../../rest';

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
}

export function NewInsuranceRequest() {
  const { t } = useTranslation();
  let { id } = useParams<{ id: string }>();
  const title = id ? 'ویرایش بیمه' : 'ثبت بیمه جدید';
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    form: FormTranslations,
  } = translations.pages.thirdPartyInsurance.newTab;
  const [
    { data: usersListData, isLoading: usersListLoading },
    ,
    searchUsers,
  ] = useDataApi<Paginated<UserDataMinimal>>(`users`, undefined, {
    page: 1,
    take: 20,
    order: 'DESC',
  });
  const [
    { data: vehicleListData, isLoading: vehicleListLoading },
    ,
    searchVehicles,
  ] = useDataApi<Paginated<VehicleResponse>>(`vehicles`, undefined, {
    page: 1,
    take: 20,
    order: 'DESC',
  });
  const onStartDateChange = useCallback(
    (date: dayjs.Dayjs | null) => {
      if (date) {
        form.setFieldsValue({ endDate: dayjs(date)?.add(1, 'year') });
      }
    },
    [form],
  );

  React.useEffect(() => {
    if (id) {
      const fetchInsuranceData = async (id: string) => {
        try {
          const data = await fetchTpi(id, {
            params: {
              fields: ['insurer', 'insurer.info', 'vehicle'],
            },
          });
          form.setFieldsValue({
            insurer: data?.insurer?.id,
            insurance: data?.insurance,
            bimeNumber: data?.bimeNumber,
            startDate: dayjs(data?.startDate),
            endDate: dayjs(data?.endDate),
            isCash: data?.isCash ? 'Cash' : 'Installments',
            fullAmount: data?.fullAmount,
            vehicle: data?.vehicle.id,
          });
          searchUsers({ melliCode: data?.insurer?.info?.melliCode });
          searchVehicles({ engineNumber: data?.vehicle.engineNumber });
        } catch (error) {
          setError(
            error?.response?.data ?? {
              message: 'لطفا اتصال خود را برسی نمایید!',
            },
          );
        }
      };
      setLoading(true);
      fetchInsuranceData(id);
      setDataLoaded(true);
      setLoading(false);
    }
  }, [id, form, searchUsers, searchVehicles]);

  const onFinish = useCallback(
    async values => {
      const { attachment, insurer, vehicle, isCash, ...rest } = values;

      const payload = {
        ...rest,
        attachmentId: getUploadedFileID(attachment),
        insurerId: insurer,
        vehicleId: vehicle,
        isCash: isCash === 'Cash',
      };

      setLoading(true);
      try {
        if (id) {
          const updated = await updateTpi(id, payload);
          if (updated) {
            message.success('با موفقیت بروز رسانی شد!');
            setSuccess(true);
          }
        } else {
          const created = await createTpi(payload);
          if (created) {
            message.success('بیمه با موفقیت ثبت شد!');
            setSuccess(true);
            form.resetFields();
          }
        }
      } catch {}
      setLoading(false);
    },
    [form, id],
  );

  const handleUserSearch = useCallback(
    (melliCode: string) => {
      if (melliCode) {
        searchUsers({ melliCode });
      }
    },
    [searchUsers],
  );

  const handleVehicleSearch = useCallback(
    (engineNumber: string) => {
      if (engineNumber) {
        searchVehicles({ engineNumber });
      }
    },
    [searchVehicles],
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
  return (
    <React.Fragment>
      <Helmet title={title} />
      <Typography.Title level={4}>{title}</Typography.Title>
      <Divider />
      <Form
        {...formItemLayout}
        name="newInsurance"
        onFinish={onFinish}
        scrollToFirstError
        form={form}
      >
        <Form.Item
          name="insurance"
          label={t(FormTranslations.issuer.label())}
          rules={[
            {
              required: true,
              message: t(FormTranslations.issuer.emptyError()),
            },
          ]}
        >
          <Select>
            <Select.Option value="IRAN_INSURANCE">بیمه ایران</Select.Option>
            <Select.Option value="KOSAR_INSURANCE">بیمه کوثر</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="bimeNumber"
          label={t(FormTranslations.bimeNumber.label())}
          rules={[
            {
              required: true,
              message: t(FormTranslations.bimeNumber.emptyError()),
            },
            {
              pattern: /^1[3-4][0-9]{2}\/[0-9]{1,4}\/[0-9]{1,4}\/[0-9]{1,4}\/[0-9]{1,5}(?:\/[0-9]{1,5})?$/,
              message: t(FormTranslations.bimeNumber.invalidError()),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="startDate"
          label={t(FormTranslations.startDate.label())}
          rules={[
            {
              required: true,
              message: t(FormTranslations.startDate.emptyError()),
            },
          ]}
        >
          <DatePicker format="YYYY/M/D" onChange={onStartDateChange} />
        </Form.Item>
        <Form.Item
          name="endDate"
          label={t(FormTranslations.endDate.label())}
          rules={[
            {
              required: true,
              message: t(FormTranslations.endDate.emptyError()),
            },
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
            showToday={false}
            format="YYYY/M/D"
          />
        </Form.Item>
        <Form.Item
          name="isCash"
          label={t(FormTranslations.isCash.label())}
          rules={[
            {
              required: true,
              message: t(FormTranslations.isCash.emptyError()),
            },
          ]}
        >
          <Select>
            <Select.Option value="Cash">
              {t(FormTranslations.isCash.options.cash())}
            </Select.Option>
            <Select.Option value="Installments">
              {t(FormTranslations.isCash.options.Installments())}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="fullAmount"
          initialValue={0}
          label={t(FormTranslations.fullAmount.label())}
          rules={[
            {
              required: true,
              message: t(FormTranslations.fullAmount.emptyError()),
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: '150px' }}
            formatter={value =>
              `﷼ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            step={1000000}
            parser={(value: string | undefined) =>
              value ? value.replace(/﷼\s?|(,*)/g, '') : 0
            }
          />
        </Form.Item>
        <Form.Item
          name="insurer"
          label={t(FormTranslations.insurerId.label())}
          rules={[
            {
              required: true,
              message: t(FormTranslations.insurerId.emptyError()),
            },
          ]}
        >
          <Select
            showSearch
            onSearch={debounce(handleUserSearch, 1000)}
            loading={usersListLoading}
            filterOption={(input, option) =>
              option?.melliCode?.indexOf(input) >= 0
            }
            defaultActiveFirstOption
            dropdownRender={menu =>
              customSelectRenderer(menu, '/dashboard/users/new')
            }
          >
            {usersListData?.data?.map(val => (
              <Select.Option
                key={val.id}
                value={val.id}
                melliCode={val.melliCode}
              >
                کد ملی : {val.melliCode} - {val.firstName} {val.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="vehicle"
          label={t(FormTranslations.vehicleId.label())}
          rules={[
            {
              required: true,
              message: t(FormTranslations.vehicleId.emptyError()),
            },
          ]}
        >
          <Select
            showSearch
            onSearch={debounce(handleVehicleSearch, 500)}
            loading={vehicleListLoading}
            dropdownRender={menu =>
              customSelectRenderer(menu, '/dashboard/vehicle/new')
            }
            defaultActiveFirstOption
          >
            {vehicleListData?.data.map(val => (
              <Select.Option key={val.id} value={val.id}>
                شماره موتور : {val.engineNumber}- به نام : {val.ownerName}
                {val.ownerLastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t(FormTranslations.attachment.label())}>
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
                {t(FormTranslations.attachment.guide())}
              </p>
              <p className="ant-upload-hint">
                {t(FormTranslations.attachment.help())}
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<CheckCircleOutlined />}
          >
            {t(FormTranslations.submit())}
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
