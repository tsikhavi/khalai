import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    const API_URL = process.env.API_URL;
    console.log('[export] API_URL:', API_URL);

    if (!API_URL) {
      return NextResponse.json({error: 'API_URL is not set'}, {status: 500});
    }

    const jar = await cookies();
    const token = jar.get('access_token')?.value;
    console.log('[export] token present:', Boolean(token));

    if (!token) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const search = req.nextUrl.searchParams.toString();
    const upstreamUrl = `${API_URL}/api/admin/leads/export${search ? `?${search}` : ''}`;
    console.log('[export] upstream:', upstreamUrl);

    const upstream = await fetch(upstreamUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `access_token=${token}`,
      },
      cache: 'no-store',
    });

    console.log('[export] upstream status:', upstream.status);

    if (!upstream.ok) {
      const body = await upstream.text().catch(() => '');
      console.error('[export] upstream error body:', body.slice(0, 300));
      return NextResponse.json(
        {error: 'Could not export leads', detail: body.slice(0, 300)},
        {status: upstream.status}
      );
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition':
          upstream.headers.get('Content-Disposition') ??
          'attachment; filename="leads.csv"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[export] unexpected error:', err);
    return NextResponse.json(
      {error: err instanceof Error ? err.message : 'Unknown error'},
      {status: 500}
    );
  }
}
