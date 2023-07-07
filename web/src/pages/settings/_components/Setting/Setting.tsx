import { Heading } from '@/components/Heading';
import React from 'react';

import settingCN from './Setting.module.scss';

export interface SettingProps {
  children: React.ReactNode;
  title: string;
}

export const Setting = (props: SettingProps) => {
  return (
    <div className={settingCN.container}>
      <Heading className={settingCN.title} fontSize='3xl'>
        {props.title}
      </Heading>
      {props.children}
    </div>
  );
};
