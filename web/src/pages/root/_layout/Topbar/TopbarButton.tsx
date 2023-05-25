import { ComponentPropsWithRef, forwardRef } from 'react';
import './TopbarButton.scss';
import { Icon } from 'react-feather';

export interface TopbarButtonProps
  extends ComponentPropsWithRef<'button'> {
    Icon: Icon
  }

export const TopbarButton = forwardRef<HTMLButtonElement, TopbarButtonProps>((props, ref) => {
  return (
    <button className='dashboard__topbar__button' ref={ref}>
      <props.Icon size={16} color='white' />
    </button>
  )
});
