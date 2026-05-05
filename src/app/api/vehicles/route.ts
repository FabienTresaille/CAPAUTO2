import { NextRequest, NextResponse } from 'next/server';
import { getAllVehicles, searchVehicles, createVehicle } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const marque = searchParams.get('marque') || undefined;
  const boite = searchParams.get('boite') || undefined;
  const kmMax = searchParams.get('kmMax') ? parseInt(searchParams.get('kmMax')!) : undefined;
  const nbPortes = searchParams.get('nbPortes') ? parseInt(searchParams.get('nbPortes')!) : undefined;
  const nbPlaces = searchParams.get('nbPlaces') ? parseInt(searchParams.get('nbPlaces')!) : undefined;

  if (marque || boite || kmMax || nbPortes || nbPlaces) {
    const vehicles = searchVehicles({ marque, boite, kmMax, nbPortes, nbPlaces });
    return NextResponse.json(vehicles);
  }

  const vehicles = getAllVehicles();
  return NextResponse.json(vehicles);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const data = await req.json();
  const id = createVehicle(data);
  return NextResponse.json({ id }, { status: 201 });
}
