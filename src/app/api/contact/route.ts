import { NextRequest, NextResponse } from 'next/server';
import { createMessage } from '@/lib/db';

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.nom || !data.email || !data.message) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
  }

  const id = createMessage({
    nom: data.nom,
    telephone: data.telephone || '',
    email: data.email,
    objet: data.objet || '',
    message: data.message,
  });

  return NextResponse.json({ id, success: true }, { status: 201 });
}
