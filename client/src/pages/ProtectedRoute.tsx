import React, { ReactElement, ReactNode } from 'react';

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}): ReactElement => {
  return <>{children}</>;
};

export default ProtectedRoute;
