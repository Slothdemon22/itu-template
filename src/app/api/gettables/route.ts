// app/api/get-itu-data/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET() {
  const { data, error } = await supabase
    .from('itu-test-clerk')
    .select('*');

  if (error) {
    console.error('[SUPABASE ERROR]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
