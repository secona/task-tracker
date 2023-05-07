import { Meta, StoryFn } from '@storybook/react';
import { Heading, HeadingProps } from './Heading';

const HeadingWrapper = (props: HeadingProps) => <Heading {...props} />;

export default {
  title: 'Heading',
  component: HeadingWrapper,
} as Meta<typeof HeadingWrapper>;

const Template: StoryFn<typeof HeadingWrapper> = props => (
  <HeadingWrapper {...props} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Hello, World!',
  fontSize: 'md',
};

