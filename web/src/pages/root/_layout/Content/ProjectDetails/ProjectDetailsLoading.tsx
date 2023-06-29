import { Card } from '../Card';
import projectDetailsLoadingCN from './ProjectDetailsLoading.module.scss';

export const ProjectDetailsLoading = () => {
  return (
    <Card>
      <span className={projectDetailsLoadingCN.name} />
      <span className={projectDetailsLoadingCN.description} />
    </Card>
  );
};
