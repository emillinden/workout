import type { MediaAsset } from '@/types/plan'

// Minimal, illustrative media catalog. Replace URLs with your owned assets when available.
// Basic exercises → image(s); advanced → YouTube tutorial(s). Items can have both.

export const exerciseMedia: Record<string, MediaAsset[]> = {
  // Warm-ups (robust YouTube search embeds)
  'Cat-Cow': [{ kind: 'youtubeSearch', url: 'cat cow exercise tutorial' }],
  'Hip Circles': [{ kind: 'youtubeSearch', url: 'hip circles exercise tutorial' }],
  'Glute Bridge (slow)': [{ kind: 'youtubeSearch', url: 'glute bridge tutorial' }],
  'Standing Knee Hugs': [{ kind: 'youtubeSearch', url: 'standing knee hug warm up' }],
  'Side-to-Side Step with Band': [{ kind: 'youtubeSearch', url: 'lateral band walk tutorial' }],
  'Deep Squat Hold with Hip Rock': [{ kind: 'youtubeSearch', url: 'deep squat hold hip rock' }],

  // Main
  'Bird Dog': [{ kind: 'youtubeSearch', url: 'bird dog exercise tutorial' }],
  'Glute Bridge': [{ kind: 'youtubeSearch', url: 'glute bridge exercise tutorial' }],
  'Side Plank': [{ kind: 'youtubeSearch', url: 'side plank tutorial' }],
  'Band Lateral Walks': [{ kind: 'youtubeSearch', url: 'lateral band walk tutorial' }],
  'Reverse Plank': [{ kind: 'youtubeSearch', url: 'reverse plank exercise tutorial' }],
  'Pallof Press': [{ kind: 'youtubeSearch', url: 'pallof press tutorial' }],

  'Single-Leg Deadlift': [{ kind: 'youtubeSearch', url: 'single leg deadlift tutorial' }],
  Clamshells: [{ kind: 'youtubeSearch', url: 'clamshell exercise tutorial' }],
  'Step-Ups': [{ kind: 'youtubeSearch', url: 'step ups exercise tutorial' }],
  'Bulgarian Split Squat': [{ kind: 'youtubeSearch', url: 'bulgarian split squat tutorial' }],

  'Elevated Push-Up': [{ kind: 'youtubeSearch', url: 'incline push up tutorial' }],
  'Band Row': [{ kind: 'youtubeSearch', url: 'resistance band row tutorial' }],
  'Pike Push-Up': [{ kind: 'youtubeSearch', url: 'pike push up tutorial' }],
  'Hollow Hold / Plank Taps': [
    { kind: 'youtubeSearch', url: 'plank shoulder taps tutorial' },
    { kind: 'youtubeSearch', url: 'hollow hold tutorial' },
  ],

  // Cooldowns
  'Seated forward fold': [{ kind: 'youtubeSearch', url: 'seated forward fold stretch tutorial' }],
  'Figure-4 stretch': [{ kind: 'youtubeSearch', url: 'figure 4 stretch tutorial' }],
  'Supine hamstring stretch': [{ kind: 'youtubeSearch', url: 'supine hamstring stretch tutorial' }],
}


