'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !token)) {
      router.push('/login');
    }
  }, [user, token, loading, router]);

  if (loading) return <Loading />;
  if (!user || !token) return null;

  return <>{children}</>;
}