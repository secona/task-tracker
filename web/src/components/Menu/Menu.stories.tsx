import { Meta, StoryFn } from '@storybook/react';
import { Menu } from './Menu';
import { Button } from '../Button';
import { LogOut, Settings, User } from 'react-feather';

export default {
  title: 'Menu',
  component: Menu,
} as Meta<typeof Menu>;

const Template: StoryFn<typeof Menu> = args => {
  return (
    <Menu activator={<Button>Hello</Button>}>
      <Menu.Item LeftIcon={User}>Profile</Menu.Item>
      <Menu.Item LeftIcon={Settings}>Settings</Menu.Item>
      <Menu.Item LeftIcon={LogOut}>Logout</Menu.Item>
    </Menu>
  );
};

export const Default = Template.bind({});
