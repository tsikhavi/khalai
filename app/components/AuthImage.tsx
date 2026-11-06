'use client';

import {useState} from 'react';
import Image from 'next/image';
import {cn} from '@/lib/utils';

export function AuthImage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative hidden overflow-hidden rounded-lg bg-muted md:my-auto md:block">
      {/* Skeleton layer */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-muted via-muted-foreground/10 to-muted" />
      )}

      {/* Image layer */}
      <Image
        src="/images/logo-r.png"
        alt="Authentication"
        width={500}
        height={500}
        priority
        onLoad={() => setLoaded(true)}
        className={cn(
          'inset-9 object-cover brightness-100',
          'transition-all duration-700 ease-out',
          loaded
            ? 'opacity-100 blur-0 scale-100'
            : 'opacity-0 blur-lg scale-105'
        )}
      />
    </div>
  );
}
