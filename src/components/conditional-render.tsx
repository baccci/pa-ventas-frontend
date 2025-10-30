'use client';

import React from 'react';

interface ConditionalRenderProps {
  condition: boolean;
  children: React.ReactNode;
}

export const ConditionalRender: React.FC<ConditionalRenderProps> = ({ 
  condition, 
  children 
}) => {
  return condition ? <>{children}</> : null;
};