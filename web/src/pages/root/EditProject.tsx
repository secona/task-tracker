import { ErrorResponse, isErrorResponse } from '@/api';
import { IProject, ProjectsEditBody, projectsAPI } from '@/api/projects';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { usePrevious } from '@/hooks/usePrevious';
import { queries } from '@/queries';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { PopupForm } from './_components/PopupForm/PopupForm';

export const EditProject = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const previous = usePrevious();
  const closeModal = () => navigate(previous.value);

  const query = useQuery({
    ...queries.projects(),
    onSuccess: data => {
      reset(data.find(data => data.project_id === params.projectId));
    },
  });

  const mutation = useMutation({
    mutationKey: ['edit', 'project'],
    mutationFn: async (body: ProjectsEditBody) => {
      return projectsAPI
        .edit({
          context: { projectId: params.projectId! },
          body,
        })
        .then(result => result.data.project);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['projects', 'all']);
    },
    onSuccess: edited => {
      queryClient.setQueryData<IProject[]>(['projects', 'all'], projects => {
        const idx = projects?.findIndex(
          v => v.project_id === edited.project_id
        )!;
        projects![idx] = edited;
        return projects;
      });

      closeModal();
    },
    onError: (error: ErrorResponse) => {
      switch (error.response?.data.msg) {
        case 'NOT_FOUND':
          closeModal();
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', 'all'],
      });
    },
    useErrorBoundary: error => !isErrorResponse(error, ['NOT_FOUND']),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ProjectsEditBody>({
    resolver: yupResolver(projectsAPI.edit.validation),
    defaultValues: query.data?.find(
      data => data.project_id === params.projectId
    ),
  });

  return (
    <PopupForm.WaitFor
      title='Edit Project'
      query={query}
      loadingElement='Loading...'
      closeModal={closeModal}
      onSubmit={handleSubmit(data => mutation.mutate(data))}
    >
      <TextInput {...register('name')} fieldName='Name' error={errors.name} />
      <TextInput
        {...register('description')}
        fieldName='Description'
        error={errors.description}
      />
      <Button loading={mutation.isLoading} type='submit'>
        Save
      </Button>
    </PopupForm.WaitFor>
  );
};
