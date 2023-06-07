import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IProject, projectsAPI } from '@/api/projects';
import { ProjectsNewProjectBody } from '@/api/projects/newProject';
import { Button } from '@/components/Button';
import { ModalContent } from '@/components/Modal/ModalContent';
import { TextInput } from '@/components/TextInput';

export const NewProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const closeModal = () => navigate('..');

  const mutation = useMutation({
    mutationKey: ['new', 'project'],
    mutationFn: async (body: ProjectsNewProjectBody) => {
      return projectsAPI
        .newProject({ body })
        .then(result => result.data.project);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['projects', 'all']);
    },
    onSuccess: newProject => {
      queryClient.setQueryData<IProject[]>(['projects', 'all'], projects =>
        projects!.concat(newProject)
      );

      closeModal();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', 'all'],
      });
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProjectsNewProjectBody>({
    defaultValues: {
      color: 8,
    },
  });

  return (
    <ModalContent closeModal={closeModal}>
      <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <TextInput {...register('name')} fieldName='Name' error={errors.name} />
        <TextInput
          {...register('description')}
          fieldName='Description'
          error={errors.description}
        />
        <Button type='submit'>Create</Button>
      </form>
    </ModalContent>
  );
};
