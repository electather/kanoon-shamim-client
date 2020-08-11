import { CloudDownloadOutlined, FilterOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Form,
  Menu,
  Row,
  Select,
  Typography,
} from 'antd';
import { DailyChart } from 'app/components/InsuranceCharts/DailyChart';
import { InsuranceTotalStats } from 'app/components/InsuranceTotalStats';
import DatePicker from 'app/components/uiElements/DatePicker';
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { Helmet } from 'react-helmet-async';
import { StatsIntervalDto, StatsTotalDto } from 'userResponse';
import { useDataApi } from 'utils/hooks/useDataApi';

function disabledDate(current) {
  // Can not select days before today and today
  return current && current > dayjs().endOf('day');
}
export function StatisticsTab() {
  const componentRef = useRef();
  const [
    { data: dailyStats, isLoading: isDailyLoading },
    ,
    setDailyQuery,
  ] = useDataApi<StatsIntervalDto>('stats/interval/appointments', undefined, {
    startDateMin: dayjs(dayjs().calendar('jalali').startOf('month'))
      .calendar('gregory')
      .format('YYYY-MM-DD'),
    startDateMax: dayjs().calendar('gregory').format('YYYY-MM-DD'),
    interval: 'day',
  });
  const [
    { data: totalStats, isLoading: isTotalLoading },
    ,
    setTotalQuery,
  ] = useDataApi<StatsTotalDto>('stats/total/appointments', undefined, {
    startDateMin: dayjs(dayjs().calendar('jalali').startOf('month'))
      .calendar('gregory')
      .format('YYYY-MM-DD'),
    startDateMax: dayjs().calendar('gregory').format('YYYY-MM-DD'),
    interval: 'day',
  });

  const onFinish = values => {
    setDailyQuery({
      startDateMin: values.dateRange[0]
        .calendar('gregory')
        .format('YYYY-MM-DD'),
      startDateMax: values.dateRange[1]
        .calendar('gregory')
        .format('YYYY-MM-DD'),
      interval: values.interval,
    });
    setTotalQuery({
      startDateMin: values.dateRange[0]
        .calendar('gregory')
        .format('YYYY-MM-DD'),
      startDateMax: values.dateRange[1]
        .calendar('gregory')
        .format('YYYY-MM-DD'),
      interval: values.interval,
    });
  };
  function handleMenuClick(e) {
    switch (e.key) {
      case 'jpeg':
        exportComponentAsJPEG(componentRef);
        break;
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="jpeg">دریافت خروجی JPEG</Menu.Item>
      <Menu.Item key="pdf" disabled>
        دریافت خروجی EXCEL
      </Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <Helmet title="امار و اطلاعات" />
      <Typography.Title level={4}>امار و اطلاعات</Typography.Title>
      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Form layout="inline" onFinish={onFinish}>
              <Form.Item
                name="dateRange"
                initialValue={[dayjs().startOf('month'), dayjs()]}
              >
                <DatePicker.RangePicker
                  disabledDate={disabledDate}
                  allowClear={false}
                  format="DD MMMM YYYY"
                  allowEmpty={[false, false]}
                  ranges={{
                    امروز: [dayjs(), dayjs().add(1, 'd')],
                    'این ماه': [dayjs().startOf('month'), dayjs()],
                  }}
                />
              </Form.Item>
              <Form.Item name="interval" initialValue="day">
                <Select style={{ width: '150px' }}>
                  <Select.Option value="day">روزانه</Select.Option>
                  <Select.Option value="week">هفتگی</Select.Option>
                  <Select.Option value="month">ماهانه</Select.Option>
                  <Select.Option value="quarter">سه ماهه</Select.Option>
                  <Select.Option value="year">سالانه</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isTotalLoading || isDailyLoading}
                >
                  <FilterOutlined /> دریافت آمار
                </Button>
              </Form.Item>
              <Form.Item>
                <Dropdown
                  trigger={['click']}
                  overlay={menu}
                  disabled={isTotalLoading || isDailyLoading}
                >
                  <Button>
                    <CloudDownloadOutlined /> دریافت خروجی
                  </Button>
                </Dropdown>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      {!!totalStats && (
        <InsuranceTotalStats
          stats={totalStats}
          interval={dailyStats?.interval}
          loading={isTotalLoading}
        />
      )}
      {!!dailyStats && (
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Card loading={isDailyLoading}>
              <DailyChart
                height={400}
                data={dailyStats?.dailyStats}
                id="tpi"
                ref={componentRef}
              />
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
}
