import React from 'react';

export const DEFAULT_PREVIOUS = '/';

export const PreviousContext = React.createContext({
  value: DEFAULT_PREVIOUS,
  set: (s: string) => {},
  setToHere: () => {},
  reset: () => {},
});

export const usePrevious = () => React.useContext(PreviousContext);
