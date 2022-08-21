import { TextInput } from './TextInput';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArrowRight, Mail } from 'react-feather';

export default {
  title: 'TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = args => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder',
  fieldName: 'Email',
  disabled: false,
  error: undefined,
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  placeholder: 'Placeholder',
  fieldName: 'Email',
  LeftIcon: Mail,
  disabled: false,
  error: undefined,
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  placeholder: 'Placeholder',
  fieldName: 'Email',
  RightIcon: ArrowRight,
  disabled: false,
  error: undefined,
};

export const WithRightAndLeftIcon = Template.bind({});
WithRightAndLeftIcon.args = {
  placeholder: 'Placeholder',
  fieldName: 'Email',
  LeftIcon: Mail,
  RightIcon: ArrowRight,
  disabled: false,
  error: undefined,
};
