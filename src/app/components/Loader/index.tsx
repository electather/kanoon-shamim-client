import React from 'react';
import Lottie, { Options } from 'react-lottie';

import { LoaderComponent } from './LoaderComponent';
import * as loadingData from './media/loading.json';
const defaultOptions: Options = {
  loop: true,
  autoplay: true,
  animationData: (loadingData as any).default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const Loader = () => (
  <LoaderComponent>
    <Lottie options={defaultOptions} height={300} width={300} />
  </LoaderComponent>
);
