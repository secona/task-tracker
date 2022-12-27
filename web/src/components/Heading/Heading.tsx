import { GlobalVariables } from '../../styles/global';
import { mc } from '../../utils/mergeClassnames';
import { ComponentPropsWithRef } from 'react';

import './Heading.scss';

export interface HeadingProps extends ComponentPropsWithRef<'h1'> {
  fontSize?: keyof GlobalVariables['fontSizes'];
}

export const Heading = (props: HeadingProps) => {
  const { fontSize = 'md', ...rest } = props;
  return <h1 {...mc(rest, 'heading', `heading--font-${fontSize}`)} />;
};
