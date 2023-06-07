import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

export interface QueryStateProps {
  query: UseQueryResult;
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
  if (query.isLoading) {
    if (loading) return loading as JSX.Element;
  }

  if (query.isError) {
    if (error) return error as JSX.Element;
  }

  return children as JSX.Element;
};
