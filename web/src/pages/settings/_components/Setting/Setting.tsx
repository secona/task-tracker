import React from 'react';
import { Heading } from '@/components/Heading';
import { cnProps } from '@/utils/mergeClassnames';

import settingCN from './Setting.module.scss';

export interface SettingProps {
  children: React.ReactNode;
  settingTitle: string;
}

export const Setting = (props: SettingProps) => {
  return (
    <div className={settingCN.container}>
      <Heading className={settingCN.title} fontSize='3xl'>
        {props.settingTitle}
      </Heading>
      {props.children}
    </div>
  );
};

export interface SettingFormProps
  extends Omit<SettingProps, 'children'>,
    React.ComponentPropsWithoutRef<'form'> {}

Setting.Form = ({ settingTitle, ...props }: SettingFormProps) => {
  return (
    <Setting {...props} settingTitle={settingTitle}>
      <form {...cnProps(props, settingCN.form)} />
    </Setting>
  );
};
