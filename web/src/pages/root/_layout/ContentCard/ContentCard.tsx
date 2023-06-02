import { ComponentPropsWithoutRef } from 'react';
import { cnProps } from '@/utils/mergeClassnames';

import contentCardCN from './ContentCard.module.scss';

export interface ContentCardProps extends ComponentPropsWithoutRef<'div'> {
  title?: string;
}

export const ContentCard = ({
  title,
  children,
  ...props
}: ContentCardProps) => {
  return (
    <div
      {...cnProps(
        props,
        contentCardCN.contentCard,
        title && contentCardCN.contentCard_titled
      )}
    >
      {title && <p className={contentCardCN.title}>{title}</p>}
      {children}
    </div>
  );
};
