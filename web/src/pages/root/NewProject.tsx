import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProject, projectsAPI } from '@/api/projects';
import { ProjectsNewProjectBody } from '@/api/projects/newProject';
import { usePrevious } from '@/hooks/usePrevious';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { Modal } from '@/components/Modal/Modal';

export const NewProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const previous = usePrevious();
  const closeModal = () => navigate(previous.value);

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
    resolver: yupResolver(projectsAPI.newProject.validation),
  });

  return (
    <Modal.Page
      as='form'
      onSubmit={handleSubmit(data => mutation.mutate(data))}
    >
      <Modal.Main>
        <Modal.Title>New Project</Modal.Title>
        <TextInput {...register('name')} fieldName='Name' error={errors.name} />
        <TextInput
          {...register('description')}
          fieldName='Description'
          error={errors.description}
        />
      </Modal.Main>
      <Modal.Footer>
        <Button type='submit'>Create</Button>
      </Modal.Footer>
    </Modal.Page>
  );
};
