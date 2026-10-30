import { NextResponse } from 'next/server';
import {
  POPULAR_CITIES,
  SERVICEABLE_PINCODES,
  WEST_CHAMPARAN_BLOCKS,
  PINCODE_DIRECTORY,
  searchLocations,
} from '@/lib/pincodes';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (q) {
      const results = searchLocations(q);
      return NextResponse.json({
        success: true,
        results,
      });
    }

    return NextResponse.json({
      success: true,
      popularCities: POPULAR_CITIES,
      serviceablePincodes: SERVICEABLE_PINCODES,
      blocks: WEST_CHAMPARAN_BLOCKS,
      directory: PINCODE_DIRECTORY,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch location data',
      },
      { status: 500 }
    );
  }
}
