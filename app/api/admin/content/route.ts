import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getContent, saveContent } from '../../../../lib/content.server';

const PASSWORD = process.env.ADMIN_PASSWORD ?? '123456';

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-password') === PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    await saveContent(body);
    revalidatePath('/');
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[admin/content POST]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
