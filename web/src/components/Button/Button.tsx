import { ComponentPropsWithRef } from 'react';
import { Icon } from 'react-feather';
import { cnProps } from '../../utils/mergeClassnames';

import buttonCN from './Button.module.scss';

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
      {...cnProps(
        otherProps,
        buttonCN.button,
        loading && buttonCN.button_loading
      )}
      disabled={loading || disabled}
    >
      {LeftIcon && <LeftIcon className={buttonCN.icon} size={16} />}
      <span className={buttonCN.text}>{children}</span>
      {RightIcon && <RightIcon className={buttonCN.icon} size={16} />}
    </button>
  );
};
