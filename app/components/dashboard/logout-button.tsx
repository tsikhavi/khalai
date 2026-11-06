'use client';

import {useTransition} from 'react';
import {logoutAction} from '@/lib/actions/auth';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

interface LogoutButtonProps {
  className?: string;
  variant?:
    'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  children?: React.ReactNode;
}

export function LogoutButton({
  className,
  variant = 'outline',
  children = 'Logout',
}: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      // Server action clears cookies + redirects
      await logoutAction();
    });
  };

  return (
    <Button
      variant={variant}
      aria-label="Notifications"
      onClick={handleLogout}
      disabled={isPending}
      className={cn(className)}>
      {isPending ? (
        <>
          <span className="spinner spinner-sm" />
          Logging out...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
