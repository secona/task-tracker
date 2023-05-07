import { Meta, StoryFn } from '@storybook/react';
import { Bookmark, Download, Send, Trash2 } from 'react-feather';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = props => <Button {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello',
  loading: false,
  disabled: false,
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  LeftIcon: Trash2,
  children: 'Hello',
  loading: false,
  disabled: false,
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  RightIcon: Send,
  children: 'Hello',
  disabled: false,
};

export const WithRightAndLeftIcon = Template.bind({});
WithRightAndLeftIcon.args = {
  LeftIcon: Bookmark,
  RightIcon: Download,
  children: 'Hello',
  disabled: false,
};

