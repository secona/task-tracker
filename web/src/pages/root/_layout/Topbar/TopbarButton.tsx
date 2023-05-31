import { ComponentPropsWithRef, forwardRef } from 'react';
import { Icon } from 'react-feather';

import topbarButtonCN from './TopbarButton.module.scss';
import { cnProps } from '@/utils/mergeClassnames';

export interface TopbarButtonProps extends ComponentPropsWithRef<'button'> {
  Icon: Icon;
}

export const TopbarButton = forwardRef<HTMLButtonElement, TopbarButtonProps>(
  ({ Icon, ...props }, ref) => {
    return (
      <button {...cnProps(props, topbarButtonCN.topbarButton)} ref={ref}>
        <Icon size='1rem' color='white' />
      </button>
    );
  }
);
