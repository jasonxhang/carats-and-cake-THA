import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

export const LoaderButton = ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => (
  <Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
    {isLoading && <Spinner className="spinning" animation="border" />}
    {!isLoading ? text : loadingText}
  </Button>
);
