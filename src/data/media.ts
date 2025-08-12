import type { MediaAsset } from '@/types/plan'

// Minimal, illustrative media catalog. Replace URLs with your owned assets when available.
// Basic exercises → image(s); advanced → YouTube tutorial(s). Items can have both.

export const exerciseMedia: Record<string, MediaAsset[]> = {
  // Warm-ups
  'Cat-Cow': [
    { kind: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cat-Cow_Yoga.png', title: 'Cat-Cow' },
  ],
  'Hip Circles': [{ kind: 'youtubeSearch', url: 'hip circles exercise tutorial' }],
  'Glute Bridge (slow)': [
    { kind: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Glute_bridge_exercise.png', title: 'Glute Bridge' },
  ],
  'Standing Knee Hugs': [{ kind: 'youtubeSearch', url: 'standing knee hug warm up' }],
  'Side-to-Side Step with Band': [{ kind: 'youtubeSearch', url: 'lateral band walk tutorial' }],
  'Deep Squat Hold with Hip Rock': [{ kind: 'youtubeSearch', url: 'deep squat hold hip rock' }],
  'Bird Dog': [
    { kind: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Bird-dog-exercise.png', title: 'Bird Dog form' },
  ],
  'Glute Bridge': [
    { kind: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Glute_bridge_exercise.png', title: 'Glute Bridge form' },
  ],
  'Side Plank': [
    { kind: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Side_plank.png', title: 'Side Plank position' },
    { kind: 'youtubeSearch', url: 'side plank tutorial' },
  ],
  'Band Lateral Walks': [
    { kind: 'youtubeSearch', url: 'lateral band walk tutorial' },
  ],
  'Reverse Plank': [
    { kind: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Reverse_Plank.png', title: 'Reverse Plank position' },
  ],
  'Pallof Press': [
    { kind: 'youtubeSearch', url: 'pallof press tutorial' },
  ],

  'Single-Leg Deadlift': [
    { kind: 'youtubeSearch', url: 'single leg deadlift tutorial' },
  ],
  Clamshells: [
    { kind: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Clamshell_exercise.png', title: 'Clamshells' },
  ],
  'Step-Ups': [
    { kind: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Step-up_exercise.png', title: 'Step-Ups' },
  ],
  'Bulgarian Split Squat': [
    { kind: 'youtubeSearch', url: 'bulgarian split squat tutorial' },
  ],

  'Elevated Push-Up': [
    { kind: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Incline_pushup.png', title: 'Incline Push-Up' },
  ],
  'Band Row': [
    { kind: 'youtubeSearch', url: 'resistance band row tutorial' },
  ],
  'Pike Push-Up': [
    { kind: 'youtubeSearch', url: 'pike push up tutorial' },
  ],
  'Hollow Hold / Plank Taps': [
    { kind: 'youtubeSearch', url: 'plank shoulder taps tutorial' },
    { kind: 'youtubeSearch', url: 'hollow hold tutorial' },
  ],

  // Cooldowns (examples)
  'Seated forward fold': [{ kind: 'youtubeSearch', url: 'seated forward fold stretch' }],
  'Figure-4 stretch': [{ kind: 'youtubeSearch', url: 'figure 4 stretch' }],
  'Supine hamstring stretch': [{ kind: 'youtubeSearch', url: 'supine hamstring stretch' }],
}


