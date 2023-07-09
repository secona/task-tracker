import React from 'react';
import { Heading, HeadingProps } from '@/components/Heading';
import { cnProps } from '@/utils/mergeClassnames';

import settingCN from './Setting.module.scss';

export const Setting = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...cnProps(props, settingCN.container)} />
);

Setting.Form = (props: React.ComponentPropsWithoutRef<'form'>) => (
  <form {...cnProps(props, settingCN.form, settingCN.container)} />
);

Setting.Title = (props: HeadingProps) => (
  <Heading {...cnProps(props, settingCN.title)} fontSize='3xl' />
);

Setting.Main = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...cnProps(props, settingCN.main)} />
);

Setting.Footer = (props: React.ComponentPropsWithoutRef<'footer'>) => (
  <footer {...cnProps(props, settingCN.footer)} />
);
