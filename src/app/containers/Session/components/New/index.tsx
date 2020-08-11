import { CheckCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  InputNumber,
  message,
  Result,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import DatePicker from 'app/components/uiElements/DatePicker';
import { customSelectRenderer } from 'app/components/utils/CustomSelectRenderer';
import dayjs from 'dayjs';
import { debounce } from 'debounce';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { ErrorResponse, Paginated, UserDataMinimal } from 'userResponse';
import {
  getUploadedFileID,
  localizeErrorMsg,
  statusCodeToResultStatus,
} from 'utils';
import { formItemLayout } from 'utils/const';
import { history } from 'utils/history';
import { useDataApi } from 'utils/hooks/useDataApi';

import { createSession, fetchSession, updateSession } from '../../rest';

function disabledDate(current: dayjs.Dayjs) {
  return current && current < dayjs();
}

export function NewSessionRequest() {
  let { id } = useParams<{ id: string }>();
  const title = id ? 'ویرایش جلسه' : 'ثبت جلسه جدید';
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  const [
    { data: clientsListData, isLoading: usersListLoading },
    ,
    searchClients,
  ] = useDataApi<Paginated<UserDataMinimal>>(`clients`, undefined, {
    page: 1,
    take: 20,
    order: 'DESC',
  });
  const [
    { data: doctorsListData, isLoading: doctorsListLoading },
    ,
    searchDoctors,
  ] = useDataApi<Paginated<UserDataMinimal>>(`users`, undefined, {
    page: 1,
    take: 20,
    order: 'DESC',
  });

  const onStartDateChange = useCallback(
    (date: dayjs.Dayjs | null) => {
      if (date) {
        form.setFieldsValue({ endDate: dayjs(date)?.add(1, 'hour') });
      }
    },
    [form],
  );

  React.useEffect(() => {
    if (id) {
      const fetchSessionData = async (id: string) => {
        try {
          const data = await fetchSession(id, {
            params: {
              fields: ['insurer', 'insurer.info', 'vehicle'],
            },
          });
          form.setFieldsValue({
            client: data?.clientId,
            doctor: data?.doctorId,
            startDate: dayjs(data?.startDate),
            endDate: dayjs(data?.endDate),
            amount: data?.amount,
          });
          searchClients({ melliCode: data?.client?.melliCode });
        } catch (error) {
          setError(
            error?.response?.data ?? {
              message: 'لطفا اتصال خود را برسی نمایید!',
            },
          );
        }
      };
      setLoading(true);
      fetchSessionData(id);
      setDataLoaded(true);
      setLoading(false);
    }
  }, [id, form, searchClients, searchDoctors]);

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
          const updated = await updateSession(id, payload);
          if (updated) {
            message.success('با موفقیت بروز رسانی شد!');
            setSuccess(true);
          }
        } else {
          const created = await createSession(payload);
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
        searchClients({ melliCode });
      }
    },
    [searchClients],
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
            onClick={() => history.push(`/dashboard/appointment/info/${id}`)}
          >
            بازگشت به جزئیات جلسه
          </Button>,
          <Button
            key="list"
            onClick={() => history.push('/dashboard/appointment/list')}
          >
            بازگشت به لیست جلسات
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
        subTitle="جلسه با موفقیت در سیستم ثبت(بروز رسانی) شد. هم اکنون می توانید ادامه مراحل ثبت بیمه را انجام دهید."
        extra={[
          id ? (
            <Button
              type="primary"
              key="new"
              onClick={() => history.push(`/dashboard/appointment/info/${id}`)}
            >
              بازگشت به لیست جلسات
            </Button>
          ) : (
            <Button type="primary" key="new" onClick={() => setSuccess(false)}>
              ثبت جلسه جدید
            </Button>
          ),
          <Button
            key="list"
            onClick={() => history.push('/dashboard/appointment/list')}
          >
            بازگشت به لیست جلسات
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
          name="client"
          label="درمان شونده"
          rules={[
            {
              required: true,
              message: 'انتخاب درمان شونده اجباری است',
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
              customSelectRenderer(menu, '/dashboard/client/new')
            }
          >
            {clientsListData?.data?.map(val => (
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
          name="doctor"
          label="درمانگر"
          rules={[
            {
              required: true,
              message: 'انتخاب درمانگر اجباری است',
            },
          ]}
        >
          <Select
            showSearch
            loading={doctorsListLoading}
            filterOption={(input, option) => option?.name?.indexOf(input) >= 0}
          >
            {doctorsListData?.data?.map(val => (
              <Select.Option
                key={val.id}
                value={val.id}
                name={val.lastName + ' ' + val.lastName}
              >
                {val.firstName} {val.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="startDate"
          label="زمان شروع"
          rules={[
            {
              required: true,
              message: 'انتخاب زمان شروع اجباری است.',
            },
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
            onChange={onStartDateChange}
            showToday
            showHour
            showMinute
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="زمان پایان"
          rules={[
            {
              required: true,
              message: 'انتخاب زمان پایان اجباری است',
            },
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
            showHour
            showMinute
            showToday={false}
          />
        </Form.Item>
        <Form.Item
          name="amount"
          initialValue={0}
          label="هزینه جلسه"
          rules={[
            {
              required: true,
              message: 'تعیین هزینه جلسه اجباری است',
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: '150px' }}
            formatter={value =>
              `﷼ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            step={100000}
            parser={(value: string | undefined) =>
              value ? value.replace(/﷼\s?|(,*)/g, '') : 0
            }
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<CheckCircleOutlined />}
          >
            رزرو جلسه
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
