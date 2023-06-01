import React from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  querySelector?: string;
}

export const Portal = (props: PortalProps) =>
  createPortal(
    props.children,
    document.querySelector(props.querySelector || 'body')!
  );
