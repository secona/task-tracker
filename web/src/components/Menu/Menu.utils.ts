export function getDropdownPosition(
  activatorRef: React.RefObject<HTMLElement> | null,
  menuEl: HTMLDivElement | undefined
) {
  if (activatorRef?.current && menuEl) {
    const activatorRect = activatorRef.current.getBoundingClientRect();
    const menuRect = menuEl.getBoundingClientRect();

    const isBottomClear =
      activatorRect.bottom + menuRect.height <= window.innerHeight;
    const isRightClear =
      activatorRect.left + menuRect.width <= window.innerWidth;

    const topValue = isBottomClear
      ? activatorRect.bottom
      : activatorRect.top - menuRect.height;
    const leftValue = isRightClear
      ? activatorRect.left
      : activatorRect.right - menuRect.width;

    return [topValue, leftValue];
  } else {
    return [0, 0];
  }
}
