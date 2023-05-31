import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Icon } from 'react-feather';
import { cnProps } from '../../utils/mergeClassnames';

import buttonCN from './Button.module.scss';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  LeftIcon?: Icon;
  RightIcon?: Icon;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { loading, children, LeftIcon, RightIcon, disabled, ...otherProps } =
      props;

    return (
      <button
        {...cnProps(
          otherProps,
          buttonCN.button,
          loading && buttonCN.button_loading
        )}
        ref={ref}
        disabled={loading || disabled}
      >
        {LeftIcon && <LeftIcon className={buttonCN.icon} size='1rem' />}
        <span className={buttonCN.text}>{children}</span>
        {RightIcon && <RightIcon className={buttonCN.icon} size='1rem' />}
      </button>
    );
  }
);
