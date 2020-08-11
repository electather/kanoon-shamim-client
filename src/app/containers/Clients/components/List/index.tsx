import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space, Table, Tag, Typography } from 'antd';
import type {
  Key,
  SorterResult,
  TablePaginationConfig,
} from 'antd/lib/table/interface';
import { getColumnSearchProps } from 'app/components/utils/TableFileter';
import { selectLoggedInUser } from 'auth/slice';
import React, { useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paginated, UserDataMinimal } from 'userResponse';
import { useDataApi } from 'utils/hooks/useDataApi';

export function ClientsList() {
  const loggedInClient = useSelector(selectLoggedInUser);
  const [
    { data: dataList, isLoading, isError },
    refresh,
    setQuery,
  ] = useDataApi<Paginated<UserDataMinimal>>(
    `clients`,
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
        order: (sorter as any)?.order === 'ascend' ? 'ASC' : 'DESC',
        phone: filters.phone?.[0].toString(),
      });
    },
    [setQuery],
  );
  return (
    <React.Fragment>
      <Helmet title="لیست بیماران" />
      <Row>
        <Col span={24} sm={18}>
          <Typography.Title level={4}>لیست بیماران</Typography.Title>
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
        }}
        scroll={{ x: 700 }}
      >
        <Table.Column
          title="نام"
          dataIndex="fullName"
          sorter={true}
          render={(_text, record: UserDataMinimal) => (
            <span>
              {record.firstName} {record.lastName}{' '}
              {record.creatorId === loggedInClient?.id && (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  ثبت شده توسط شما
                </Tag>
              )}
            </span>
          )}
        />
        <Table.Column
          title="شماره تماس"
          dataIndex="phone"
          {...searchProps}
          render={(text, record: UserDataMinimal) => (
            <a href={`tel:+98${record?.phone}`} dir="ltr">
              0{record?.phone}
            </a>
          )}
        />
        <Table.Column
          title="عملیات ها"
          render={(text, record: UserDataMinimal) => (
            <Space size="middle">
              <Link to={`/dashboard/clients/info/${record.id}`}>
                نمایش جزئیات
              </Link>
              {(loggedInClient?.role === 'ADMIN' ||
                record.creatorId === loggedInClient?.id) && (
                <Link to={`/dashboard/clients/edit/${record.id}`}>
                  ویرایش کاربر
                </Link>
              )}
            </Space>
          )}
        />
      </Table>
    </React.Fragment>
  );
}
