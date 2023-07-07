import React from 'react';
import { Icon } from 'react-feather';
import { Link, LinkProps } from 'react-router-dom';
import { cnProps } from '../../utils/mergeClassnames';

import buttonCN from './Button.module.scss';

interface Props {
  LeftIcon?: Icon;
  RightIcon?: Icon;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export interface ButtonProps
  extends Props,
    React.ComponentPropsWithoutRef<'button'> {}

export interface ButtonLinkProps extends Props, LinkProps {}

export type ButtonComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
> & {
  Link: React.ForwardRefExoticComponent<
    ButtonLinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
};

const propsJoin = ({
  // we separated props that aren't in LinkProps or
  // React.ComponentPropsWithoutRef<'button'>
  LeftIcon,
  RightIcon,
  loading,
  variant,
  ...otherProps
}: Props) =>
  cnProps(
    otherProps,
    buttonCN.button,
    buttonCN[variant || 'primary'],
    loading && buttonCN.button_loading
  );

const ButtonInsides = ({
  LeftIcon,
  RightIcon,
  children,
}: Props & { children?: React.ReactNode }) => (
  <>
    {LeftIcon && <LeftIcon className={buttonCN.icon} size='1rem' />}
    <span className={buttonCN.text}>{children}</span>
    {RightIcon && <RightIcon className={buttonCN.icon} size='1rem' />}
  </>
);

export const Button = React.forwardRef(({ ...props }, ref) => (
  <button
    {...propsJoin(props)}
    ref={ref}
    disabled={props.loading || props.disabled}
  >
    <ButtonInsides {...props} />
  </button>
)) as ButtonComponent;

Button.Link = React.forwardRef(({ ...props }, ref) => (
  <Link {...propsJoin(props)} ref={ref} to={props.to}>
    <ButtonInsides {...props} />
  </Link>
));
