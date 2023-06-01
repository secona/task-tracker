import { Meta, StoryFn } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Heading } from '../Heading';

export default {
  title: 'Modal',
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = args => {
  return (
    <Modal activator={<Button>Hello</Button>}>
      {({ closeModal }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            alignItems: 'flex-start',
          }}
        >
          <Heading fontSize='6xl'>Hello, World!</Heading>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi
            laudantium hic sed incidunt porro necessitatibus ratione vitae ab
            nulla non in iste, provident dolores optio magnam fuga nihil
            deserunt.
          </p>
          <Button onClick={closeModal}>Close</Button>
        </div>
      )}
    </Modal>
  );
};

export const Default = Template.bind({});
