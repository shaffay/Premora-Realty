import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Premora Realty — Real Estate with Clarity & Care';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'radial-gradient(circle at 25% 20%, #14392a, #0a130e 60%)',
          padding: 72,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background:
              'linear-gradient(90deg, #8a1f3d, #a8294a 30%, #cba35c 70%, #e7cf95)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 120, fontWeight: 700, color: '#8a1f3d' }}>
            P
          </span>
          <span style={{ fontSize: 100, fontWeight: 700, color: '#cba35c' }}>
            o
          </span>
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 10,
              color: '#cba35c',
              textTransform: 'uppercase',
            }}
          >
            Premora Realty
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#f3efe6',
              lineHeight: 1.05,
            }}
          >
            Real Estate with Clarity & Care
          </div>
          <div style={{ fontSize: 30, color: '#9fb0a6' }}>
            Luxury property across Dubai’s most prime locations
          </div>
        </div>
      </div>
    ),
    size,
  );
}
