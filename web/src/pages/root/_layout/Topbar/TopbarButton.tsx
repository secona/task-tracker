import { ComponentPropsWithRef, forwardRef } from 'react';
import { Icon } from 'react-feather';

import topbarButtonCN from './TopbarButton.module.scss';

export interface TopbarButtonProps extends ComponentPropsWithRef<'button'> {
  Icon: Icon;
}

export const TopbarButton = forwardRef<HTMLButtonElement, TopbarButtonProps>(
  (props, ref) => {
    return (
      <button className={topbarButtonCN.topbarButton} ref={ref}>
        <props.Icon size={16} color='white' />
      </button>
    );
  }
);

