import { Meta, StoryFn } from '@storybook/react';
import { Menu } from './Menu';
import { Button } from '../Button';
import { MenuItem } from './MenuItem/MenuItem';
import { LogOut, Settings, User } from 'react-feather';

export default {
  title: 'Menu',
  component: Menu,
} as Meta<typeof Menu>;

const Template: StoryFn<typeof Menu> = args => {
  return (
    <Menu activator={<Button>Hello</Button>}>
      <MenuItem LeftIcon={User}>Profile</MenuItem>
      <MenuItem LeftIcon={Settings}>Settings</MenuItem>
      <MenuItem LeftIcon={LogOut}>Logout</MenuItem>
    </Menu>
  );
};

export const Default = Template.bind({});
