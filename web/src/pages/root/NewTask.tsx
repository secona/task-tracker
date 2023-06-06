import { projectsAPI, ProjectsNewTaskBody } from '@/api/projects';
import { ITask } from '@/api/tasks';
import { Button } from '@/components/Button';
import { ModalContent } from '@/components/Modal/ModalContent';
import { TextInput } from '@/components/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const NewTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { projectId } = useParams() as { projectId: string };
  const closeModal = () => navigate('..');

  const mutation = useMutation({
    mutationKey: ['new', 'task'],
    mutationFn: async (body: ProjectsNewTaskBody) => {
      return projectsAPI
        .newTask({
          context: { projectId },
          body,
        })
        .then(result => result.data.task);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['projects', projectId, 'tasks']);
    },
    onSuccess: newTask => {
      queryClient.setQueryData<ITask[]>(
        ['projects', projectId, 'tasks'],
        tasks => tasks!.concat(newTask)
      );

      closeModal();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'tasks'],
      });
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProjectsNewTaskBody>({
    resolver: yupResolver(projectsAPI.newTask.validation),
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
