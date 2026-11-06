'use client';

import {usePathname} from 'next/navigation';
import Navbar from '@/components/Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const section = segments[1]; // locale is segments[0]

  if (
    section === 'dashboard' ||
    section === 'horizontal' ||
    section === 'creativity'
  )
    return null;
  return <Navbar />;
}
