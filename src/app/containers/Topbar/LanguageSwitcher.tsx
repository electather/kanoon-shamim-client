import { GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderDropdownWrapper } from './components/HeaderDropdownWrapper';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;

  const changeLang = ({ key }: any) => i18n.changeLanguage(key);

  const locales = ['en', 'fa'];
  const languageLabels = {
    en: t(translations.topBar.languages.en()),
    fa: t(translations.topBar.languages.fa()),
  };
  const languageIcons = {
    en: '🇺🇸',
    fa: '🇮🇷',
  };
  const langMenu = (
    <Menu className="menu" selectedKeys={[selectedLang]} onClick={changeLang}>
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdownWrapper>
      <Dropdown overlay={langMenu}>
        <span className="dropDown ">
          <GlobalOutlined title={t(translations.topBar.languages.change())} />
        </span>
      </Dropdown>
    </HeaderDropdownWrapper>
  );
}
