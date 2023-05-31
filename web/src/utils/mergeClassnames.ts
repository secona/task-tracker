type Falsy = null | undefined | false | 0 | -0 | 0n | '';

export const cn = (...classNames: (string | Falsy)[]) => {
  return classNames.filter(Boolean).join(' ');
};

export const cnProps = (
  props: Record<string, any>,
  ...className: (string | Falsy)[]
) => {
  return {
    ...props,
    className: cn(props.className, ...className),
  };
};
