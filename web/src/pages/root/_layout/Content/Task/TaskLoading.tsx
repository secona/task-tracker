import taskLoadingCN from './TaskLoading.module.scss';

export const TaskLoading = () => {
  return (
    <div className={taskLoadingCN.taskLoading}>
      <div className={taskLoadingCN.taskLoadingDone} />
      <section>
        <div className={taskLoadingCN.taskLoadingTask} />
        <div className={taskLoadingCN.taskLoadingDescription} />
      </section>
    </div>
  );
};
