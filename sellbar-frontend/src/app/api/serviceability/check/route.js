import { NextResponse } from 'next/server';
import { lookupPincode, isServiceablePincode, SERVICEABLE_PINCODES } from '@/lib/pincodes';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pin = searchParams.get('pincode') || '';

    const info = lookupPincode(pin);

    return NextResponse.json({
      success: true,
      serviceable: info.isServiceable,
      data: info,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to check serviceability',
      },
      { status: 500 }
    );
  }
}
