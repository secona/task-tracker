import { projectsAPI, ProjectsNewTaskData } from '@/api/projects';
import { Button } from '@/components/Button';
import { ModalContent } from '@/components/Modal/ModalContent';
import { TextInput } from '@/components/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const NewTask = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const closeModal = () => navigate('..');

  const mutation = useMutation({
    mutationKey: ['new', 'task'],
    mutationFn: (data: ProjectsNewTaskData) => {
      return projectsAPI.newTask(data);
    },
    onSuccess: () => {
      closeModal();
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProjectsNewTaskData>({
    resolver: yupResolver(projectsAPI.newTask.validation),
    defaultValues: {
      projectId,
    },
  });

  return (
    <ModalContent closeModal={closeModal}>
      <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <TextInput {...register('task')} fieldName='Task' error={errors.task} />
        <TextInput
          {...register('description')}
          fieldName='Description'
          error={errors.description}
        />
        <Button loading={mutation.isLoading} type='submit'>
          Create
        </Button>
      </form>
    </ModalContent>
  );
};
