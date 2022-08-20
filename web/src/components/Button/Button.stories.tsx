import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Bookmark, Download, Send, Trash2 } from 'react-feather';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = props => <Button {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello'
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  LeftIcon: Trash2,
  children: 'Hello'
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  RightIcon: Send,
  children: 'Hello'
};

export const WithRightAndLeftIcon = Template.bind({});
WithRightAndLeftIcon.args = {
  LeftIcon: Bookmark,
  RightIcon: Download,
  children: 'Hello'
};
