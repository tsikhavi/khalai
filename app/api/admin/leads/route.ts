import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';

const API_URL = process.env.API_URL!;

export async function GET(req: NextRequest) {
  const jar = await cookies();
  const token = jar.get('access_token')?.value;
  if (!token) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const search = req.nextUrl.searchParams.toString();
  const upstream = await fetch(
    `${API_URL}/api/admin/leads${search ? `?${search}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `access_token=${token}`,
      },
      cache: 'no-store',
    }
  );

  if (!upstream.ok) {
    return NextResponse.json(
      {error: 'Could not fetch leads'},
      {status: upstream.status}
    );
  }

  return NextResponse.json(await upstream.json());
}
