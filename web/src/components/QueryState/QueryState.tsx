import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

export interface QueryStateProps {
  children: React.ReactNode;
  Error: React.FC<FallbackProps>;
}

export const QueryState = (props: QueryStateProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={props.Error}>
          {props.children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
