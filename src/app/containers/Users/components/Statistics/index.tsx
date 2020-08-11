import { Col, Row, Statistic } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function Statistics() {
  const { t } = useTranslation();
  const { overViewTab } = translations.pages.users;

  return (
    <React.Fragment>
      <Helmet title={t(overViewTab.title())} />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Statistic title={t(overViewTab.total())} value={112893} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Statistic
            title={t(overViewTab.past30Days())}
            value={120000}
            suffix={t(translations.global.rials())}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
