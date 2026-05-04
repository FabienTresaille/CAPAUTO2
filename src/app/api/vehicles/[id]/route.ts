import { NextRequest, NextResponse } from 'next/server';
import { getVehicleById, updateVehicle, deleteVehicle } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const vehicle = getVehicleById(parseInt(params.id));
  if (!vehicle) return NextResponse.json({ error: 'Véhicule non trouvé' }, { status: 404 });
  return NextResponse.json(vehicle);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const data = await req.json();
  updateVehicle(parseInt(params.id), data);
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  deleteVehicle(parseInt(params.id));
  return NextResponse.json({ success: true });
}
