import {
  Badge,
  Button,
  Col,
  Divider,
  Drawer,
  List,
  Row,
  Typography,
} from 'antd';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import Calendar from 'app/components/uiElements/Calendar';
import { selectLoggedInUser } from 'auth/slice';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paginated, SessionResponse } from 'userResponse';
import { formatDate } from 'utils';
import { useDataApi } from 'utils/hooks/useDataApi';

export function SessionList() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const thisMonth = useMemo<[dayjs.Dayjs, dayjs.Dayjs]>(
    () => [
      dayjs(dayjs().calendar('jalali').startOf('month')),
      dayjs(dayjs().calendar('jalali').endOf('month')),
    ],
    [],
  );
  const [drawerVisible, setDrawerVisible] = useState<dayjs.Dayjs | undefined>(
    undefined,
  );
  const [
    { data: dailySessionList, isLoading: isDailyListLoading },
    ,
    getDailySessionList,
  ] = useDataApi<Paginated<SessionResponse>>(
    `sessions`,
    {
      data: [],
      meta: { itemCount: 0, page: 1, take: 10, pageCount: 1 },
    },
    {
      page: 1,
      take: 10,
      order: 'DESC',
      fields: ['client', 'doctor'],
    },
  );

  const [
    { data: sessionsList, isLoading, isError },
    refresh,
    setQuery,
  ] = useDataApi<Paginated<SessionResponse>>(
    `sessions`,
    {
      data: [],
      meta: { itemCount: 0, page: 1, take: 10, pageCount: 1 },
    },
    {
      page: 1,
      take: 10,
      order: 'DESC',
      startDateMin: thisMonth[0].calendar('gregory').format('YYYY-MM-DD'),
      startDateMax: thisMonth[1].calendar('gregory').format('YYYY-MM-DD'),
      fields: ['client', 'doctor'],
    },
  );

  const dateCellRender = useCallback(
    (date: Dayjs) => {
      const sessionList = sessionsList?.data.filter(item =>
        dayjs(item.startDate).isSame(date, 'day'),
      );
      return sessionList ? (
        <ul className="sessions">
          {sessionList.map(item => {
            const startDate = dayjs(item?.startDate);
            const status = startDate.isBefore(date, 'minute')
              ? 'default'
              : item?.sessionStatus === 'done'
              ? 'success'
              : 'error';
            const text = `${startDate.format('HH:mm')} : ${
              item?.client?.lastName
            } - ${item.doctor?.lastName}`;
            return (
              <li key={item?.id}>
                <Badge status={status} text={text} />
              </li>
            );
          })}
        </ul>
      ) : null;
    },
    [sessionsList],
  );

  const onDateSelect = useCallback(
    (date: Dayjs) => {
      setDrawerVisible(date);
      getDailySessionList({
        page: 1,
        take: 50,
        order: 'DESC',
        startDateMin: date
          .calendar('gregory')
          .startOf('day')
          .format('YYYY-MM-DD'),
        startDateMax: date
          .calendar('gregory')
          .add(1, 'day')
          .endOf('day')
          .format('YYYY-MM-DD'),
      });
    },
    [getDailySessionList],
  );

  return (
    <React.Fragment>
      <Helmet title="لیست جلسات این ماه" />
      <Row>
        <Col span={24} sm={18}>
          <Typography.Title level={4}>لیست جلسات</Typography.Title>
        </Col>
        <Col span={24} sm={6} style={{ textAlign: 'left' }}>
          <Button
            disabled={isDailyListLoading}
            style={{ width: '100%' }}
            onClick={() => refresh()}
            type={isError ? 'primary' : 'default'}
          >
            {isDailyListLoading
              ? 'لطفا صبر کنید ...'
              : isError
              ? 'تلاش دوباره'
              : 'بارگذاری مجدد'}
          </Button>
        </Col>
      </Row>
      <Divider />
      <Calendar
        fullscreen
        validRange={thisMonth}
        dateCellRender={dateCellRender}
        onSelect={onDateSelect}
      />
      <Drawer
        width={600}
        title={`جلسات ${drawerVisible?.format(' DD MMMM')}`}
        placement="left"
        closable
        onClose={() => setDrawerVisible(undefined)}
        visible={!!drawerVisible}
      >
        <List
          size="small"
          loading={isDailyListLoading}
          dataSource={dailySessionList?.data}
          renderItem={({ id, startDate, client, doctor }) => (
            <List.Item
              key={id}
              actions={[
                <Link key="href" to={`/dashboard/sessions/info/${id}`}>
                  نمایش جزئیات
                </Link>,
              ]}
            >
              {formatDate(startDate, 'HH:mm')}: {client?.firstName}{' '}
              {client?.lastName} - دکتر {doctor?.lastName}
            </List.Item>
          )}
        />
      </Drawer>
    </React.Fragment>
  );
}
