export const mc = (
  props: Record<string, any>,
  ...className: (string | undefined | false)[]
) => {
  if (!props.className) props.className = '';
  props.className = [props.className, ...className.filter(Boolean)].join(' ');
  return props;
};
