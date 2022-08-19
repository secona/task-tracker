import { ComponentPropsWithRef } from 'react';
import styled, { DefaultTheme } from 'styled-components';

export interface StrippedHeadingProps {
  fontSize?: keyof DefaultTheme['fontSizes'];
  fontColor?: keyof DefaultTheme['color'];
}

export interface HeadingProps
  extends ComponentPropsWithRef<'h1'>,
    StrippedHeadingProps {}

export const Heading = styled.h1<StrippedHeadingProps>`
  line-height: 1;
  font-weight: 700;
  font-size: ${p => p.theme.fontSizes[p.fontSize || 'md']} !important;
  color: ${p => p.theme.color[p.fontColor || 'white']};
  font-size: 1rem;
`;
