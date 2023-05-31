import { GlobalVariables } from '../../styles/global';
import { cnProps } from '../../utils/mergeClassnames';
import { ComponentPropsWithRef } from 'react';

import headingCN from './Heading.module.scss';

export interface HeadingProps extends ComponentPropsWithRef<'h1'> {
  fontSize?: keyof GlobalVariables['fontSizes'];
}

export const Heading = (props: HeadingProps) => {
  const { fontSize = 'md', ...rest } = props;
  return (
    <h1
      {...cnProps(
        rest,
        headingCN.heading,
        headingCN[`heading_font${fontSize}`]
      )}
    />
  );
};
