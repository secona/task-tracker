export const mc = (
  props: Record<string, any>,
  ...className: (string | undefined | false)[]
) => {
  return {
    ...props,
    className: [props.className, ...className.filter(Boolean)].join(' '),
  };
};
