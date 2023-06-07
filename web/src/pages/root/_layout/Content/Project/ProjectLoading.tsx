import projectLoadingCN from './ProjectLoading.module.scss';

export const ProjectLoading = () => {
  return (
    <div className={projectLoadingCN.loading}>
      <div className={projectLoadingCN.loadingName} />
      <div className={projectLoadingCN.loadingDescription} />
    </div>
  );
};
