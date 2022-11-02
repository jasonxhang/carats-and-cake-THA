import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

interface LoaderButtonProps {
  isLoading: boolean;
  text: string;
  loadingText: string;
  className?: string;
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
}
export const LoaderButton = ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  type,
  ...props
}: LoaderButtonProps) => (
  <Button
    type={type}
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <Spinner className="spinning" animation="border" />}
    {!isLoading ? text : loadingText}
  </Button>
);
