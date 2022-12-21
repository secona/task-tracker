import { mc } from '../../utils/mergeClassnames';
import { ComponentPropsWithRef } from 'react';
import { Icon } from 'react-feather';

import './Button.scss';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  LeftIcon?: Icon;
  RightIcon?: Icon;
  loading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { loading, children, LeftIcon, RightIcon, disabled, ...otherProps } =
    props;

  return (
    <button
      {...mc(otherProps, 'button', loading && 'button--loading')}
      disabled={loading || disabled}
    >
      {LeftIcon && <LeftIcon className='button__icon button__icon--left' size={16} />}
      <span className='button__text'>{children}</span>
      {RightIcon && <RightIcon className='button__icon button__icon--right' size={16} />}
    </button>
  );
};
