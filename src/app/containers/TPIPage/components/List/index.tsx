import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space, Table, Tag, Typography } from 'antd';
import type {
  Key,
  SorterResult,
  TablePaginationConfig,
} from 'antd/lib/table/interface';
import { getColumnSearchProps } from 'app/components/utils/TableFileter';
import { selectLoggedInUser } from 'auth/slice';
import { translations } from 'locales/i18n';
import React, { useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paginated, TPIResponse } from 'userResponse';
import { formatDate, formatMoney } from 'utils';
import { useDataApi } from 'utils/hooks/useDataApi';

export function InsuranceList() {
  const { t } = useTranslation();
  const { table } = translations.pages.thirdPartyInsurance.dataTab;
  const loggedInUser = useSelector(selectLoggedInUser);
  const [
    { data: dataList, isLoading, isError },
    refresh,
    setQuery,
  ] = useDataApi<Paginated<TPIResponse>>(
    `third-party`,
    {
      data: [],
      meta: { itemCount: 0, page: 1, take: 10, pageCount: 1 },
    },
    {
      page: 1,
      take: 10,
      order: 'DESC',
    },
  );

  const searchProps = useMemo(getColumnSearchProps, []);

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      filters: Record<string, Key[] | null>,
      sorter: SorterResult<any> | SorterResult<any>[],
    ) => {
      setQuery({
        page: pagination.current || 1,
        take: pagination.pageSize || 10,
        bimeNumber: filters.bimeNumber?.[0].toString(),
        order: (sorter as any)?.order === 'ascend' ? 'ASC' : 'DESC',
      });
    },
    [setQuery],
  );
  return (
    <React.Fragment>
      <Helmet
        title={t(translations.pages.thirdPartyInsurance.dataTab.title())}
      />
      <Row>
        <Col span={24} sm={18}>
          <Typography.Title level={4}>
            {t(translations.pages.thirdPartyInsurance.dataTab.title())}
          </Typography.Title>
        </Col>
        <Col span={24} sm={6} style={{ textAlign: 'left' }}>
          <Button
            disabled={isLoading}
            style={{ width: '100%' }}
            onClick={() => refresh()}
            type={isError ? 'primary' : 'default'}
          >
            {isLoading
              ? 'لطفا صبر کنید ...'
              : isError
              ? 'تلاش دوباره'
              : 'بارگذاری مجدد'}
          </Button>
        </Col>
      </Row>
      <Divider />
      <Table
        rowKey={record => record.id}
        onChange={handleTableChange}
        dataSource={dataList?.data}
        loading={isLoading}
        pagination={{
          defaultCurrent: 1,
          total: dataList?.meta?.itemCount,
          showSizeChanger: true,
          hideOnSinglePage: false,
          showTotal: total => t(table.general.found(), { items: total }),
        }}
        scroll={{ x: 1000 }}
      >
        <Table.Column
          title={t(table.headers.bimeNumber())}
          dataIndex="bimeNumber"
          {...searchProps}
        />
        <Table.Column
          title={t(table.headers.Insurer())}
          dataIndex="insurer"
          render={(_text, record: TPIResponse) => (
            <span key={record.insurer?.id}>
              {record?.insurer?.firstName} {record?.insurer?.lastName}
              {record.creatorId === loggedInUser?.id && (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  ثبت شده توسط شما
                </Tag>
              )}
            </span>
          )}
        />
        <Table.Column
          title={t(table.headers.startDate())}
          dataIndex="startDate"
          render={(text, record: TPIResponse) => (
            <span>{formatDate(record.startDate)}</span>
          )}
        />
        <Table.Column
          title={t(table.headers.endDate())}
          dataIndex="endDate"
          sorter={true}
          render={(text, record: TPIResponse) => (
            <span>{formatDate(record.endDate)}</span>
          )}
        />
        <Table.Column
          title={t(table.headers.price())}
          dataIndex="fullAmount"
          render={(text, record: TPIResponse) => (
            <span>{formatMoney(record.fullAmount)}</span>
          )}
        />
        <Table.Column
          title={t(table.headers.actions())}
          render={(_text, record: TPIResponse) => (
            <Space size="middle">
              <Link to={`/dashboard/tpi/info/${record.id}`}>نمایش جزئیات</Link>
              {(loggedInUser?.role === 'ADMIN' ||
                record.creatorId === loggedInUser?.id) && (
                <Link to={`/dashboard/tpi/edit/${record.id}`}>ویرایش بیمه</Link>
              )}
            </Space>
          )}
        />
      </Table>
    </React.Fragment>
  );
}
