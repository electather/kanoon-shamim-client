import { Divider, Timeline, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { BodyInsuranceResponse, TPIResponse } from 'userResponse';
import { daysTillToday, formatDate, formatMoney, sortByDate } from 'utils';

export type ProgressBarProps = {
  title: string;
  list?: BodyInsuranceResponse[] | TPIResponse[];
  url: 'tpi' | 'bii';
};

export const InsuranceTimeLine: React.FC<ProgressBarProps> = React.memo(
  ({ title, list, url }) => {
    return (
      <React.Fragment>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Divider />
        <Timeline mode="alternate" reverse>
          {list?.sort(sortByDate).map((item: TPIResponse) => {
            const remainingDays = daysTillToday(item?.endDate);
            return (
              <Timeline.Item
                label={formatDate(item.startDate)}
                color={remainingDays > 0 ? 'green' : 'red'}
              >
                بیمه به شماره{' '}
                <Typography.Text copyable mark>
                  {item.bimeNumber}
                </Typography.Text>
                {item?.vehicle?.engineNumber && (
                  <p>
                    خودرو با شماره موتور{' '}
                    <Typography.Text copyable mark>
                      {item.vehicle.engineNumber}
                    </Typography.Text>
                  </p>
                )}
                <p>
                  با مبلغ {formatMoney(item.fullAmount)} به صورت{' '}
                  {item.isCash ? 'نقدی' : 'اقساطی'}
                </p>
                {remainingDays > 0 ? (
                  <p>سر رسید در {remainingDays.toFixed(1)} روز</p>
                ) : (
                  <p>بیمه منقضی شده</p>
                )}
                <Link to={`/dashboard/${url}/info/${item.id}`}>
                  اطلاعات بیمه
                </Link>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </React.Fragment>
    );
  },
);
