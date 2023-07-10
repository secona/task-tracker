import { Meta, StoryFn } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { useModal } from './useModal';

export default {
  title: 'Modal',
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = args => {
  const modal = useModal();

  return (
    <>
      <Button onClick={modal.open}>Open</Button>
      <Modal modal={modal}>
        <Modal.Main>
          <Modal.Title>Hello, World!</Modal.Title>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi
            laudantium hic sed incidunt porro necessitatibus ratione vitae ab
            nulla non in iste, provident dolores optio magnam fuga nihil
            deserunt.
          </p>
        </Modal.Main>
        <Modal.Footer>
          <Button onClick={modal.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
