import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorResponse, isErrorResponse } from '@/api';
import { ITask, ITaskEditable, TasksEditBody, tasksAPI } from '@/api/tasks';
import { Button } from '@/components/Button';
import { ModalContent } from '@/components/Modal/ModalContent';
import { TextInput } from '@/components/TextInput';
import { queries } from '@/queries';

export const EditTask = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const closeModal = () => navigate('..');

  const query = useQuery(queries.tasks(params.projectId));

  const mutation = useMutation({
    mutationKey: ['edit', 'task'],
    mutationFn: async (body: TasksEditBody) => {
      return tasksAPI
        .edit({ body, context: { taskId: params.taskId! } })
        .then(result => result.data.task);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['projects', params.projectId, 'tasks']);
    },
    onSuccess: edited => {
      queryClient.setQueryData<ITask[]>(
        ['projects', params.projectId, 'tasks'],
        tasks => {
          const idx = tasks?.findIndex(v => v.task_id === edited.task_id)!;
          tasks![idx] = edited;
          return tasks;
        }
      );

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
        queryKey: ['projects', params.projectId, 'tasks'],
      });
    },
    useErrorBoundary: error => !isErrorResponse(error, ['NOT_FOUND']),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskEditable>({
    resolver: yupResolver(tasksAPI.edit.validation),
    defaultValues: query.data?.find(data => data.task_id === params.taskId),
  });

  return (
    <ModalContent closeModal={closeModal}>
      {query.isLoading ? (
        'Loading...'
      ) : (
        <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
          <TextInput
            {...register('task')}
            fieldName='Task'
            error={errors.task}
          />
          <TextInput
            {...register('description')}
            fieldName='Description'
            error={errors.description}
          />
          <Button loading={mutation.isLoading} type='submit'>
            Save
          </Button>
        </form>
      )}
    </ModalContent>
  );
};
