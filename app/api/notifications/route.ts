import {NextResponse} from 'next/server';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({count: 0}, {status: 401});

  try {
    // Admin: total open threads. User: total unread admin replies.
    if (user.role === 'ADMIN') {
      const threads = await apiFetch<Array<{status: string}>>(
        '/api/admin/inbox?status=open',
        {cache: 'no-store'}
      );
      return NextResponse.json({count: threads.length});
    }

    const data = await apiFetch<{count: number}>('/api/contact/mine/unread', {
      cache: 'no-store',
    });
    return NextResponse.json({count: data.count});
  } catch {
    return NextResponse.json({count: 0});
  }
}
