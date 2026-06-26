import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        base: '#0a130e',
        panel: '#0e1b14',
        card: '#0e1b14',
        deeper: '#081109',
        // Primary green / CTA
        primary: {
          DEFAULT: '#1e5b40',
          hover: '#246e4d',
          deep: '#102a1e',
          mid: '#14392a',
        },
        // Gold accent
        gold: {
          DEFAULT: '#cba35c',
          bright: '#e7cf95',
          hi: '#fff3d6',
          deep: '#b88a3f',
        },
        // Burgundy secondary accent
        burgundy: {
          DEFAULT: '#8a1f3d',
          bright: '#a8294a',
          deep: '#4a1020',
        },
        // Text
        warm: '#f3efe6',
        ink: '#eef2ee',
        body: '#c4ccc4',
        muted: '#9fb0a6',
        dim: '#7d8d83',
        // Utility
        whatsapp: '#25d366',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-mulish)', 'Mulish', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        'gold-line': 'rgba(203,163,92,.16)',
        'burgundy-line': 'rgba(168,41,74,.5)',
      },
      backgroundImage: {
        'accent-bar':
          'linear-gradient(90deg, #8a1f3d, #a8294a 30%, #cba35c 70%, #e7cf95)',
        'gold-sweep':
          'linear-gradient(90deg, #b88a3f 0%, #cba35c 25%, #fff3d6 50%, #cba35c 75%, #b88a3f 100%)',
        'burgundy-gold': 'linear-gradient(135deg, #8a1f3d 0%, #cba35c 100%)',
        'radial-glow':
          'radial-gradient(circle at 30% 20%, rgba(138,31,61,.22), transparent 55%), radial-gradient(circle at 80% 60%, rgba(203,163,92,.14), transparent 50%)',
      },
      boxShadow: {
        card: '0 18px 50px -20px rgba(0,0,0,.7)',
        'card-hover': '0 28px 70px -24px rgba(0,0,0,.85)',
        gold: '0 10px 40px -12px rgba(203,163,92,.35)',
      },
      borderRadius: {
        card: '16px',
      },
      letterSpacing: {
        eyebrow: '0.28em',
        wide7: '0.5em',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(37,211,102,.45)' },
          '70%': { boxShadow: '0 0 0 14px rgba(37,211,102,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
        scrollCue: {
          '0%,100%': { transform: 'translateY(0)', opacity: '.5' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
        floatLights: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '40px 0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp .6s cubic-bezier(0.16,1,0.3,1) both',
        pulseRing: 'pulseRing 2.2s infinite',
        shimmer: 'shimmer 6s linear infinite',
        scrollCue: 'scrollCue 1.8s ease-in-out infinite',
        floatLights: 'floatLights 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
