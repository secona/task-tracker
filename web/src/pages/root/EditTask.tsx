import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorResponse, isErrorResponse } from '@/api';
import { ITask, TasksEditBody, tasksAPI } from '@/api/tasks';
import { usePrevious } from '@/hooks/usePrevious';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { queries } from '@/queries';
import { Modal } from '@/components/Modal/Modal';
import { QueryState } from '@/components/QueryState';

export const EditTask = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const previous = usePrevious();
  const closeModal = () => navigate(previous.value);

  const query = useQuery({
    ...queries.tasks(params.projectId),
    onSuccess: data => {
      reset(data.find(data => data.task_id === params.taskId));
    },
  });

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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TasksEditBody>({
    resolver: yupResolver(tasksAPI.edit.validation),
    defaultValues: query.data?.find(data => data.task_id === params.taskId),
  });

  return (
    <Modal.Page
      as='form'
      onSubmit={handleSubmit(data => mutation.mutate(data))}
    >
      <QueryState query={query} loading='Loading...'>
        <Modal.Main>
          <Modal.Title>Edit Task</Modal.Title>
          <TextInput
            {...register('task')}
            fieldName='Task'
            error={errors.task}
            autoFocus
          />
          <TextInput
            {...register('description')}
            fieldName='Description'
            error={errors.description}
          />
        </Modal.Main>
        <Modal.Footer>
          <Button loading={mutation.isLoading} type='submit'>
            Save
          </Button>
        </Modal.Footer>
      </QueryState>
    </Modal.Page>
  );
};
