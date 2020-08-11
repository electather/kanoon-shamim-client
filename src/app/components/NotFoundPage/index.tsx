import { translations } from 'locales/i18n';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Lottie, { Options } from 'react-lottie';
import styled from 'styled-components/macro';

import * as errorData from './media/error.json';

const defaultOptions: Options = {
  loop: true,
  autoplay: true,
  animationData: (errorData as any).default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(translations.errorPages[404].title())}</title>
        <meta
          name="description"
          content={t(translations.errorPages[404].subTitle())}
        />
      </Helmet>
      <Wrapper>
        <Lottie options={defaultOptions} height={200} width={350} />

        <P>{t(translations.errorPages[404].subTitle())}</P>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const P = styled.p`
  font-size: 1.3rem;
  line-height: 2.1;
  margin: 0.625rem 0 1.5rem 0;
`;
