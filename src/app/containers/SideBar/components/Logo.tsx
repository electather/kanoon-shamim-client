import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Logo: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const { t } = useTranslation();

  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              {/* <i className={siteConfig.siteIcon} /> */}
              ICON
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard">{t(translations.global.siteName())}</Link>
        </h3>
      )}
    </div>
  );
};
