import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useSession } from '@/lib/auth';
import { LoadingState } from '@/components/status/LoadingState';

export function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useSession();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingState message="Securing your workspace" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
