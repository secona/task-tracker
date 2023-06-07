import { ProjectName } from '../ProjectName';

export const Greeting = () => {
  const greetingToUse = (() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 18) return 'Afternoon';
    return 'Evening';
  })();

  return <ProjectName>Good {greetingToUse}!</ProjectName>;
};
