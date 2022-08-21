import { ComponentPropsWithRef } from 'react';
import { Icon } from 'react-feather';
import styled, { keyframes } from 'styled-components';

const Slide = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-23px);
  }
`;

const _Button = styled.button`
  position: relative;
  transition: 0.2s;
  padding: 0.5rem 0.75rem;
  border: none;
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
  overflow: hidden;

  & > span {
    position: relative;
  }

  & > .button-icon {
    position: relative;
    color: ${p => p.theme.color['teal-500-contrast']};
  }

  &:hover {
    background-color: ${p => p.theme.color['teal-600']};
    color: ${p => p.theme.color['teal-600-contrast']};
  }

  &:active {
    background-color: ${p => p.theme.color['teal-700']};
    color: ${p => p.theme.color['teal-700-contrast']};
  }

  &[data-is-loading='false']:disabled {
    cursor: default;
    color: ${p => p.theme.color['grey-800']};
    background-color: ${p => p.theme.color['grey-700']};
    & > .button-icon {
      color: ${p => p.theme.color['grey-800']};
    }
  }

  &[data-is-loading='true'] {
    cursor: wait;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background: repeating-linear-gradient(
        600deg,
        ${p => p.theme.color['teal-500']} 0,
        ${p => p.theme.color['teal-500']} 10px,
        ${p => p.theme.color['teal-600']} 10px,
        ${p => p.theme.color['teal-600']} 20px
      );
      animation: ${Slide} 0.5s infinite linear;
    }
  }
`;

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  LeftIcon?: Icon;
  RightIcon?: Icon;
  loading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { loading, children, LeftIcon, RightIcon, disabled, ...rest } = props;

  return (
    <_Button {...rest} data-is-loading={loading} disabled={loading || disabled}>
      {LeftIcon && <LeftIcon className='button-icon' size={16} />}
      <span>{children}</span>
      {RightIcon && <RightIcon className='button-icon' size={16} />}
    </_Button>
  );
};
