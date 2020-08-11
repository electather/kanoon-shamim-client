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
import { Paginated, VehicleResponse } from 'userResponse';
import { formatDate } from 'utils';
import { useDataApi } from 'utils/hooks/useDataApi';

export function VehiclesList() {
  const { t } = useTranslation();
  const { table } = translations.pages.vehicle.dataTab;
  const loggedInUser = useSelector(selectLoggedInUser);
  const [
    { data: dataList, isLoading, isError },
    refresh,
    setQuery,
  ] = useDataApi<Paginated<VehicleResponse>>(
    `vehicles`,
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
        engineNumber: filters.engineNumber?.[0].toString(),
        chassisNumber: filters.chassisNumber?.[0].toString(),
        order: (sorter as any)?.order === 'ascend' ? 'ASC' : 'DESC',
      });
    },
    [setQuery],
  );
  return (
    <React.Fragment>
      <Helmet title={t(translations.pages.vehicle.dataTab.title())} />
      <Row>
        <Col span={24} sm={18}>
          <Typography.Title level={4}>
            {t(translations.pages.vehicle.dataTab.title())}
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
        onChange={handleTableChange as any}
        dataSource={dataList?.data}
        loading={isLoading}
        pagination={{
          defaultCurrent: 1,
          total: dataList?.meta?.itemCount,
          showSizeChanger: true,
          hideOnSinglePage: false,
          showTotal: total => t(table.general.found(), { items: total }),
        }}
        scroll={{ x: 900 }}
      >
        <Table.Column
          title={t(table.headers.insurer())}
          dataIndex="insurer"
          render={(_text, record: VehicleResponse) => (
            <span key={record.insurer?.id}>
              {record.insurer?.firstName} {record.insurer?.lastName}
              {record.creatorId === loggedInUser?.id && (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  ثبت شده توسط شما
                </Tag>
              )}
            </span>
          )}
        />
        <Table.Column
          title={t(table.headers.owner())}
          dataIndex="owner"
          render={(_text, record: VehicleResponse) => (
            <span key={record.id}>
              {record.ownerName} {record.ownerLastName}
            </span>
          )}
        />
        <Table.Column
          title={t(table.headers.engineNumber())}
          dataIndex="engineNumber"
          {...searchProps}
        />
        <Table.Column
          title={t(table.headers.chassisNumber())}
          dataIndex="chassisNumber"
          {...searchProps}
        />
        <Table.Column
          title={t(table.headers.creationDate())}
          dataIndex="createdAt"
          width="15%"
          sorter={true}
          render={(_text, record: VehicleResponse) => (
            <span>{formatDate(record.createdAt)}</span>
          )}
        />
        <Table.Column
          title={t(table.headers.actions())}
          render={(_text, record: VehicleResponse) => (
            <Space size="middle">
              <Link to={`/dashboard/vehicle/info/${record.id}`}>
                نمایش جزئیات
              </Link>
              {(loggedInUser?.role === 'ADMIN' ||
                record.creatorId === loggedInUser?.id) && (
                <Link to={`/dashboard/vehicle/edit/${record.id}`}>
                  ویرایش خودرو
                </Link>
              )}
            </Space>
          )}
        />
      </Table>
    </React.Fragment>
  );
}
