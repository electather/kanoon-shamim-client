import { Card, Col, Row, Statistic } from 'antd';
import dayjs from 'dayjs';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatsTotalDto } from 'userResponse';
import { formatIntervalType } from 'utils';

export type InsuranceTotalStatsProps = {
  interval?: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
  stats?: StatsTotalDto;
  loading: boolean;
};

export const InsuranceTotalStats: React.FC<InsuranceTotalStatsProps> = React.memo(
  ({ interval, stats, loading }) => {
    const { t } = useTranslation();

    return (
      <Card loading={loading}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Statistic
              title="دسته بندی اطلاعات"
              value={formatIntervalType(interval)}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="تاریخ شروع"
              value={dayjs(stats?.startDate).format('YYYY/M/D')}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="تاریخ پایان"
              value={dayjs(stats?.endDate).format('YYYY/M/D')}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Statistic title="بیمه های ثبت شده" value={stats?.count} />
          </Col>
          <Col span={8}>
            <Statistic
              title="ارزش کل بیمه های ثبت شده"
              value={stats?.totalValue}
              suffix={t(translations.global.rials())}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="کل کمیسیون بیمه های ثبت شده"
              value={stats?.commission}
              suffix={t(translations.global.rials())}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Statistic
              title="میانگین بیمه های ثبت شده"
              value={stats?.avgValue?.toFixed(2)}
              suffix={t(translations.global.rials())}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="میانگین کمیسیون هر بیمه"
              value={stats?.avgCommission?.toFixed(2)}
              suffix={t(translations.global.rials())}
            />
          </Col>
        </Row>
      </Card>
    );
  },
);
