import { RenderBodyArgs } from 'gatsby';
import React from 'react';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import { getCssString } from './src/stitches.config';

export const onRenderBody = ({ setHeadComponents }: RenderBodyArgs) => {
  setHeadComponents([
    <style
      key='stitches'
      id='stitches'
      dangerouslySetInnerHTML={{
        __html: getCssString(),
      }}
    />,
  ]);
};
