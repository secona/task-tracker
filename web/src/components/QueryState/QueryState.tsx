import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

export interface QueryStateProps {
  query: UseQueryResult | UseQueryResult[];
  children: React.ReactNode;
  loading?: React.ReactNode;
  error?: React.ReactNode;
}

export const QueryState = ({
  query,
  loading,
  children,
  error,
}: QueryStateProps) => {
  const isQueries = Array.isArray(query);
  const isLoading = isQueries ? query.some(q => q.isLoading) : query.isLoading;
  const isError = isQueries ? query.some(q => q.isError) : query.isError;

  if (isLoading) {
    if (loading) return loading as JSX.Element;
  }

  if (isError) {
    if (error) return error as JSX.Element;
  }

  return children as JSX.Element;
};
