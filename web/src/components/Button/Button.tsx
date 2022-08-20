import { ComponentPropsWithRef } from 'react';
import { Icon } from 'react-feather';
import styled from 'styled-components';

const _Button = styled.button`
  transition: 0.2s;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background-color: ${p => p.theme.color['teal-500']};
  color: ${p => p.theme.color['teal-500-contrast']};
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  cursor: pointer;

  & > .button-icon {
    color: white;
  }

  &:hover {
    background-color: ${p => p.theme.color['teal-600']};
    color: ${p => p.theme.color['teal-600-contrast']};
  }

  &:active {
    background-color: ${p => p.theme.color['teal-700']};
    color: ${p => p.theme.color['teal-700-contrast']};
  }
`;

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  LeftIcon?: Icon;
  RightIcon?: Icon;
}

export const Button = (props: ButtonProps) => {
  const { children, LeftIcon, RightIcon, ...rest } = props;

  return (
    <_Button {...rest}>
      {LeftIcon && <LeftIcon className='button-icon' size={16} />}
      <span>{children}</span>
      {RightIcon && <RightIcon className='button-icon' size={16} />}
    </_Button>
  );
};
