import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading, HeadingProps } from './Heading';

const HeadingWrapper = (props: HeadingProps) => <Heading {...props} />;

export default {
  title: 'Heading',
  component: HeadingWrapper,
} as ComponentMeta<typeof HeadingWrapper>;

const Template: ComponentStory<typeof HeadingWrapper> = props => (
  <HeadingWrapper {...props} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Hello, World!',
  fontSize: 'md',
  fontColor: 'white',
};
