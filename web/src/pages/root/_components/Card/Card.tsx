import { ComponentPropsWithoutRef } from 'react';
import { cnProps } from '@/utils/mergeClassnames';

import cardCN from './Card.module.scss';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  title?: string;
}

export const Card = ({ title, children, ...props }: CardProps) => {
  return (
    <div {...cnProps(props, cardCN.card, title && cardCN.card_titled)}>
      {title && <p className={cardCN.title}>{title}</p>}
      {children}
    </div>
  );
};
