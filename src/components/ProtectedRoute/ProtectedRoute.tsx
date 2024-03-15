import { useUserContext } from '@/contexts/UserContext';
import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  to?: string;
  children?: ReactNode;
}

export function ProtectedRoute({
  to = '/',
  children,
}: ProtectedRouteProps = {}) {
  const {user} = useUserContext();
  if(!user) {
    return <Navigate to={to} />
  }
  return children ?? <Outlet />
}
