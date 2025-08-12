// Auto-derived from make-pdf.py content
// A 12-week plan with 4 training days per week: Mon, Wed, Sat, Sun

import type { Plan, Week, Day, Block, Exercise, Prescription, ShowIf, BlockType } from '@/types/plan'

// --------------------------
// Source data from make-pdf.py
// --------------------------

const warmup_day1 = [
  'Cat-Cow – 6 reps',
  'Hip Circles – 5 each way',
  'Glute Bridge (slow) – 10 reps',
  'Bird Dog (light, 2s hold) – 6 each side',
  'Standing Knee Hugs – 6 each side',
  'Side-to-Side Step with Band – 10 steps each way',
  'Deep Squat Hold with Hip Rock – 30 sec',
]

const table_day1_header = [
  'Week',
  'Bird Dog',
  'Glute Bridge',
  'Side Plank',
  'Band Lateral Walks',
  'Reverse Plank',
  'Pallof Press (Wk5+)',
]
const table_day1_rows: string[][] = [
  ['1', '2×8 (3s)', '2×12 (2s)', '2×20s', '2×8 steps', '2×15s', '-'],
  ['2', '3×8 (3s)', '3×12 (2s)', '3×20s', '3×8 steps', '2×20s', '-'],
  ['3', '3×10 (3s)', '3×14 (2s)', '3×25s', '3×10 steps', '2×25s', '-'],
  ['4', '3×12 (3s)', '3×15 (2s)', '3×30s', '3×12 steps', '2×30s', '-'],
  ['5', '3×12 (4s)', '3×18 (3s)', '3×35s', '3×14 steps', '3×20s', '2×10'],
  ['6', '3×14 (4s)', '3×20 (3s)', '3×40s', '3×16 steps', '3×25s', '3×10'],
  ['7', '4×12 (4s)', '4×20 (3s)', '4×40s', '4×16 steps', '3×30s', '3×12'],
  ['8', '4×14 (4s)', '4×22 (3s)', '4×45s', '4×18 steps', '3×35s', '3×12'],
  ['9', '4×14 (5s)', '4×25 (3s)', '4×50s', '4×20 steps', '3×40s', '3×14'],
  ['10', '4×15 (5s)', '4×25 (3s)', '4×55s', '4×20 steps', '3×45s', '3×14'],
  ['11', '4×16 (5s)', '4×28 (3s)', '4×60s', '4×22 steps', '4×40s', '4×15'],
  ['12', '4×18 (5s)', '4×30 (3s)', '4×70s', '4×24 steps', '4×45s', '4×15'],
]

const cooldown_day1 = [
  'Foam roll glutes – 1 min',
  'Foam roll hip flexors – 1 min',
  'Supine hamstring stretch – 30s each',
  'Figure-4 stretch – 30s each',
  'Seated forward fold – 1 min',
]

const warmup_day2 = [
  'Bodyweight Squat – 10 reps',
  'Leg Swings front/back – 10 each',
  'Hip Openers – 5 each side',
  'Glute Bridge with March – 6 each side',
  'Single-Leg Balance with Arm Reach – 5 each side',
  'Walking Lunge with Twist – 5 each side',
  'Band Good Morning – 10 reps',
]
const table_day2_header = [
  'Week',
  'Single-Leg Deadlift',
  'Clamshells',
  'Step-Ups',
  'Bulgarian Split Squat',
]
const table_day2_rows: string[][] = [
  ['1', '2×6', '2×12', '2×8', '2×6'],
  ['2', '3×6', '3×12', '3×8', '3×6'],
  ['3', '3×8', '3×14', '3×10', '3×8'],
  ['4', '3×8', '3×15', '3×12', '3×8'],
  ['5', '3×10', '3×16', '3×12', '3×10'],
  ['6', '3×10', '3×18', '3×14', '3×10'],
  ['7', '4×10', '4×18', '4×14', '4×10'],
  ['8', '4×12', '4×20', '4×14', '4×12'],
  ['9', '4×12', '4×22', '4×16', '4×12'],
  ['10', '4×14', '4×22', '4×16', '4×14'],
  ['11', '4×14', '4×24', '4×18', '4×14'],
  ['12', '4×15', '4×25', '4×18', '4×15'],
]
const cooldown_day2 = [
  'Foam roll hamstrings – 1 min',
  'Foam roll quads – 1 min',
  'Foam roll calves – 30s each',
  'Pigeon stretch – 30s each',
  'Kneeling hip flexor stretch – 30s each',
]

const warmup_day3 = [
  'March in place – 40 sec',
  'Arm swings – 40 sec',
  'Hip circles – 40 sec',
  'Bodyweight squats – 10 reps',
  'Torso twist – 10 each side',
  'Ankle circles – 5 each way per leg',
  'Cat-Cow – 6 reps',
]
const table_day3_header = ['Week', 'Cardio (HRmax)', 'Mobility Flow']
const table_day3_rows: string[][] = [
  ['1–4', '20–25 min @ 60–70%', "World’s Greatest Stretch, Hip Flexor Stretch, T-Spine Rotations, Child’s Pose"],
  ['5–8', '25–30 min (+1–2 min/week)', 'Same as above'],
  ['9–12', '30–35 min (last 5 min intervals)', 'Same as above'],
]
const cooldown_day3 = [
  'Forward fold hang – 40s',
  'Calf stretch on wall – 30s each',
  'Shoulder stretch across body – 30s each',
  'Standing quad stretch – 30s each',
  'Deep breathing seated – 1 min',
]

const warmup_day4 = [
  'Arm Circles – 10 each way',
  'Shoulder Rolls – 10 each way',
  'Band Pull-Aparts – 15 reps',
  'Wall Slides – 8 reps',
  'Plank to Down Dog – 5 reps',
  'Cat-Cow – 6 reps',
  'Scapular Push-Ups – 8 reps',
]
const table_day4_header = [
  'Week',
  'Elevated Push-Up',
  'Band Row',
  'Pike Push-Up',
  'Hollow Hold / Plank Taps (Wk9+)',
]
const table_day4_rows: string[][] = [
  ['1', '2×8', '2×8', '2×6', '2×15s'],
  ['2', '3×8', '3×8', '3×6', '2×20s'],
  ['3', '3×10', '3×10', '3×8', '3×20s'],
  ['4', '3×10', '3×10', '3×8', '3×25s'],
  ['5', '3×12', '3×12', '3×8', '3×30s'],
  ['6', '3×12', '3×12', '3×10', '3×35s'],
  ['7', '4×12', '4×12', '4×10', '3×40s'],
  ['8', '4×12', '4×14', '4×10', '3×45s'],
  ['9', '4×14', '4×14', '4×12', '4×40s (Plank Taps)'],
  ['10', '4×14', '4×14', '4×12', '4×45s (Plank Taps)'],
  ['11', '4×15', '4×15', '4×12', '4×50s (Plank Taps)'],
  ['12', '4×15', '4×15', '4×14', '4×60s (Plank Taps)'],
]
const cooldown_day4 = [
  'Foam roll lats – 1 min',
  'Foam roll mid-back – 1 min',
  'Child’s pose – 1 min',
  'Seated forward fold – 1 min',
  'Neck side stretch – 30s each',
]

// --------------------------
// Helpers to expand weekly prescriptions
// --------------------------

function parseNameAndRules(raw: string): { name: string; showIf?: ShowIf } {
  // Patterns like "Pallof Press (Wk5+)" or "Something (Wk3-6)"
  const wkPlus = raw.match(/\(\s*Wk\s*(\d+)\s*\+\s*\)/i)
  if (wkPlus) {
    const minWeek = parseInt(wkPlus[1], 10)
    const name = raw.replace(wkPlus[0], '').trim()
    return { name, showIf: { minWeek } }
  }
  const wkRange = raw.match(/\(\s*Wk\s*(\d+)\s*[-–]\s*(\d+)\s*\)/i)
  if (wkRange) {
    const minWeek = parseInt(wkRange[1], 10)
    const maxWeek = parseInt(wkRange[2], 10)
    const name = raw.replace(wkRange[0], '').trim()
    return { name, showIf: { minWeek, maxWeek } }
  }
  return { name: raw.trim() }
}

function parseCellToPrescription(cell: string): { prescription: Prescription; display: string } {
  const value = (cell || '').trim()
  if (!value || value === '-' || value.toLowerCase() === 'same as above') {
    return { prescription: { type: 'none' }, display: value || '' }
  }
  // Patterns handled:
  //  - 3×10
  //  - 3×12 (2s)
  //  - 3×20s
  //  - 4×40s (Plank Taps)  -> will keep detail
  //  - 2×8 steps
  //  - 20–25 min @ 60–70%
  //  - 30–35 min (last 5 min intervals)
  // Try structured matches first
  const times = value.match(/^(\d+)\s*[×x]\s*(\d+)(?:\s*\((\d+)s\))?$/i)
  if (times) {
    const sets = parseInt(times[1], 10)
    const reps = parseInt(times[2], 10)
    const tempo = times[3] ? parseInt(times[3], 10) : undefined
    return {
      prescription: { type: 'reps', sets, reps, tempoSeconds: tempo },
      display: value,
    }
  }
  const timePerSet = value.match(/^(\d+)\s*[×x]\s*(\d+)s(?:\s*\(([^)]+)\))?$/i)
  if (timePerSet) {
    const sets = parseInt(timePerSet[1], 10)
    const seconds = parseInt(timePerSet[2], 10)
    const detail = timePerSet[3]
    return {
      prescription: { type: 'time', sets, seconds, detail },
      display: value,
    }
  }
  const steps = value.match(/^(\d+)\s*[×x]\s*(\d+)\s*steps$/i)
  if (steps) {
    const sets = parseInt(steps[1], 10)
    const stepCount = parseInt(steps[2], 10)
    return {
      prescription: { type: 'steps', sets, steps: stepCount },
      display: value,
    }
  }
  const hold = value.match(/^(\d+)\s*[×x]\s*(\d+)s$/i)
  if (hold) {
    const sets = parseInt(hold[1], 10)
    const seconds = parseInt(hold[2], 10)
    return {
      prescription: { type: 'hold', sets, seconds },
      display: value,
    }
  }
  const cardio = value.match(/^(\d+)[–-](\d+)\s*min(?:.*)$/i)
  if (cardio) {
    // For ranges, store average minutes in seconds and keep detail
    const a = parseInt(cardio[1], 10)
    const b = parseInt(cardio[2], 10)
    const avg = Math.round((a + b) / 2)
    return {
      prescription: { type: 'time', seconds: avg * 60, detail: value },
      display: value,
    }
  }
  // Fallback to mixed freeform
  return { prescription: { type: 'mixed', detail: value }, display: value }
}

function expandPrescriptions(header: string[], rows: string[][], week: number): Exercise[] {
  // header[0] is 'Week'
  const names = header.slice(1)
  // find the row matching this week. Some tables use ranges like '1–4'.
  const row =
    rows.find((r) => r[0] === String(week)) ||
    rows.find((r) => {
      const key = r[0]
      const m = key.match(/^(\d+)[–-](\d+)$/)
      if (!m) return false
      const a = parseInt(m[1], 10)
      const b = parseInt(m[2], 10)
      return week >= a && week <= b
    })
  if (!row)
    return names.map((n) => ({ name: n, prescription: { type: 'none' as const }, display: '' }))
  const values = row.slice(1)
  const items = names.map((rawName, i) => {
    const cell = (values[i] ?? '').trim()
    const { name, showIf } = parseNameAndRules(rawName)
    // Apply show rules based on current week
    if (showIf) {
      if (showIf.minWeek && week < showIf.minWeek) return null
      if (showIf.maxWeek && week > showIf.maxWeek) return null
    }
    // If cell is empty or '-' for this week, hide
    if (cell === '' || cell === '-') return null
    const { prescription, display } = parseCellToPrescription(cell)
    return { name, prescription, display, showIf }
  })
  return items.filter((x): x is Exercise => x !== null)
}

export function buildPlan(): Plan {
  const weeks: Week[] = []
  // parse warmup/cooldown entries like "Cat-Cow – 6 reps"
  const parseWarmupCooldown = (s: string): Exercise => {
    const [namePart, right] = s.split(' – ')
    let display = right || ''
    // simple patterns like "6 reps" or "30 sec"
    if (right) {
      const mReps = right.match(/^(\d+)\s*reps?$/i)
      if (mReps) {
        return {
          name: namePart,
          prescription: { type: 'reps', sets: 1, reps: parseInt(mReps[1], 10) },
          display,
        }
      }
      const mSec = right.match(/^(\d+)\s*s(ec|econds)?$/i)
      if (mSec) {
        return {
          name: namePart,
          prescription: { type: 'hold', sets: 1, seconds: parseInt(mSec[1], 10) },
          display,
        }
      }
    }
    return { name: namePart || s, prescription: { type: 'none' }, display }
  }

  for (let w = 1; w <= 12; w++) {
    const days: Day[] = [
      {
        dayIndex: 1,
        name: 'Monday',
        focus: 'Core Stability + Glute Activation',
        blocks: [
          { type: 'warmup', title: 'Warm-Up (~5 min)', items: warmup_day1.map(parseWarmupCooldown) },
          { type: 'workout', title: 'Main', items: expandPrescriptions(table_day1_header, table_day1_rows, w) },
          { type: 'cooldown', title: 'Cool-Down (~5 min)', items: cooldown_day1.map(parseWarmupCooldown) },
        ],
      },
      {
        dayIndex: 2,
        name: 'Wednesday',
        focus: 'Posterior Chain + Lower Body Strength',
        blocks: [
          { type: 'warmup', title: 'Warm-Up (~5 min)', items: warmup_day2.map(parseWarmupCooldown) },
          { type: 'workout', title: 'Main', items: expandPrescriptions(table_day2_header, table_day2_rows, w) },
          { type: 'cooldown', title: 'Cool-Down (~5 min)', items: cooldown_day2.map(parseWarmupCooldown) },
        ],
      },
      {
        dayIndex: 3,
        name: 'Saturday',
        focus: 'Cardio + Mobility Flow',
        blocks: [
          { type: 'warmup', title: 'Warm-Up (~5 min)', items: warmup_day3.map(parseWarmupCooldown) },
          { type: 'workout', title: 'Main', items: expandPrescriptions(table_day3_header, table_day3_rows, w) },
          { type: 'cooldown', title: 'Cool-Down (~5 min)', items: cooldown_day3.map(parseWarmupCooldown) },
        ],
      },
      {
        dayIndex: 4,
        name: 'Sunday',
        focus: 'Upper Body + Core',
        blocks: [
          { type: 'warmup', title: 'Warm-Up (~5 min)', items: warmup_day4.map(parseWarmupCooldown) },
          { type: 'workout', title: 'Main', items: expandPrescriptions(table_day4_header, table_day4_rows, w) },
          { type: 'cooldown', title: 'Cool-Down (~5 min)', items: cooldown_day4.map(parseWarmupCooldown) },
        ],
      },
    ]

    weeks.push({ weekIndex: w, days })
  }

  return {
    meta: { name: '12-Week Lower Back Rehab-to-Strength Plan', durationWeeks: 12 },
    weeks,
  }
}

export const plan = buildPlan()

