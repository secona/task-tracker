import { cnProps } from '@/utils/mergeClassnames';
import altActionCN from './AltAction.module.scss';

export interface AltActionProps
  extends React.ComponentPropsWithoutRef<'span'> {}

export const AltAction = (props: AltActionProps) => {
  return <span {...cnProps(props, altActionCN.altAction)} />;
};
