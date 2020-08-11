import { Col, Row, Table, Typography } from 'antd';
import { ExportCSV } from 'app/components/utils/ExportToCsv';
import React from 'react';
import { BodyInsuranceResponse, TPIResponse } from 'userResponse';
import { daysTillToday, formatDate, formatMoney } from 'utils';

type RenewalListData = TPIResponse[] | BodyInsuranceResponse[];

const formatExportData = (data?: RenewalListData) => {
  if (!data) {
    return undefined;
  }
  const formatted = data.map(data => ({
    شناسه: data.id,
    'بیمه گزار': data.insurer.firstName + ' ' + data.insurer.lastName,
    'شماره تماس': data.insurer.phone,
    'تاریخ ثبت': formatDate(data.createdAt),
    'شماره بیمه': data.bimeNumber,
    'تاریخ شروع بیمه': formatDate(data.startDate),
    'تاریخ پایان بیمه ': formatDate(data.endDate),
    'نحوه پرداخت': data.isCash ? 'نقدی' : 'اقساطی',
    'مبلغ کل': formatMoney(data.fullAmount),
    بیمه: data.insurance === 'KOSAR_INSURANCE' ? 'بیمه کوثر' : 'بیمه ایران',
  }));
  return formatted;
};
export const RenewalList: React.FC<{
  data?: RenewalListData;
  loading: boolean;
  title: string;
}> = ({ data, loading, title }) => (
  <div>
    <Row>
      <Col span={12}>
        <Typography.Title level={4}>{title}</Typography.Title>
      </Col>
      <Col span={12} style={{ textAlign: 'left' }}>
        <ExportCSV csvData={formatExportData(data)} fileName="export" />
      </Col>
    </Row>

    <Table
      rowKey={record => record.id}
      dataSource={data}
      loading={loading}
      scroll={{ y: 240 }}
      pagination={false}
    >
      <Table.Column
        title="شماره بیمه"
        dataIndex="bimeNumber"
        width="30%"
        // render={(text, record) => (
        //   <span key={record.to?.id}>{record.to?.name}</span>
        // )}
      />
      <Table.Column
        title="نام بیمه گذار"
        render={(text, record: TPIResponse | BodyInsuranceResponse) => (
          <span>
            {record.insurer.firstName} {record.insurer.lastName}
          </span>
        )}
      />
      <Table.Column
        title="تلفن همراه"
        render={(text, record: TPIResponse | BodyInsuranceResponse) => (
          <a href={`tel:+98${record.insurer.phone}`} dir="ltr">
            +98{record.insurer.phone}
          </a>
        )}
      />
      <Table.Column
        title="سر رسید"
        render={(_text, record: TPIResponse | BodyInsuranceResponse) => (
          <span>{daysTillToday(record.endDate)} روز</span>
        )}
      />
    </Table>
  </div>
);
