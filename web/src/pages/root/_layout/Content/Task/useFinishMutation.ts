import { ErrorResponse, isErrorResponse } from '@/api';
import { ITask, tasksAPI } from '@/api/tasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

export const useFinishMutation = (task: ITask) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['edit', 'tasks', task.task_id],
    mutationFn: async () => {
      return tasksAPI
        .edit({
          context: { taskId: task.task_id },
          body: { done: !task.done },
        })
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
    },
    onError: (error: ErrorResponse) => {
      switch (error.response?.data.msg) {
        case 'NOT_FOUND':
          navigate(0);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', params.projectId, 'tasks'],
      });
    },
    useErrorBoundary: error => !isErrorResponse(error, ['NOT_FOUND']),
  });
};
