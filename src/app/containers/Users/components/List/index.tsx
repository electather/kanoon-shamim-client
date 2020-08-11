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
import { Paginated, UserDataMinimal } from 'userResponse';
import { useDataApi } from 'utils/hooks/useDataApi';

export function UsersList() {
  const { t } = useTranslation();
  const { table } = translations.pages.users.dataTab;
  const loggedInUser = useSelector(selectLoggedInUser);
  const [
    { data: dataList, isLoading, isError },
    refresh,
    setQuery,
  ] = useDataApi<Paginated<UserDataMinimal>>(
    `users`,
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
      <Helmet title={t(translations.pages.users.dataTab.title())} />
      <Row>
        <Col span={24} sm={18}>
          <Typography.Title level={4}>
            {t(translations.pages.users.dataTab.title())}
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
        scroll={{ x: 700 }}
      >
        <Table.Column
          title={t(table.headers.fullName())}
          dataIndex="fullName"
          sorter={true}
          render={(_text, record: UserDataMinimal) => (
            <span>
              {record.firstName} {record.lastName}{' '}
              {record.creatorId === loggedInUser?.id && (
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
          title={t(table.headers.actions())}
          render={(text, record: UserDataMinimal) => (
            <Space size="middle">
              <Link to={`/dashboard/users/info/${record.id}`}>
                نمایش جزئیات
              </Link>
              {(loggedInUser?.role === 'ADMIN' ||
                record.creatorId === loggedInUser?.id) && (
                <Link to={`/dashboard/users/edit/${record.id}`}>
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
