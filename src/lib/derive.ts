import type { Day, Exercise, Plan, Prescription } from '@/types/plan'
import { isDone } from '@/lib/progress'

export function buildPrescriptionChips(p?: Prescription): string[] {
  const chips: string[] = []
  if (!p) return chips
  if (p.type === 'reps') {
    const parts: string[] = []
    if (p.sets) parts.push(String(p.sets))
    if (p.reps) parts.push(String(p.reps))
    if (parts.length) chips.push(parts.join('×'))
    if (p.tempoSeconds) chips.push(`${p.tempoSeconds}s tempo`)
  } else if (p.type === 'time' || p.type === 'hold') {
    const prefix = p.sets ? `${p.sets}×` : ''
    if (p.seconds) chips.push(`${prefix}${p.seconds}s`)
  } else if (p.type === 'steps') {
    if (p.sets && p.steps) chips.push(`${p.sets}×${p.steps} steps`)
  } else if (p.type === 'distance') {
    if (p.distanceMeters) chips.push(`${p.distanceMeters}m`)
    if (p.pace) chips.push(p.pace)
  } else if (p.type === 'intensity') {
    if (typeof p.rpe === 'number') chips.push(`RPE ${p.rpe}`)
    if (typeof p.heartRatePercent === 'number') chips.push(`HR ${p.heartRatePercent}%`)
    if (typeof p.loadPercent === 'number') chips.push(`${p.loadPercent}% 1RM`)
  }
  if (p.detail && chips.length === 0) chips.push(p.detail)
  return chips
}

export function extractYouTubeId(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '')
    if (u.searchParams.has('v')) return u.searchParams.get('v') || ''
    const m = u.pathname.match(/\/embed\/([\w-]+)/)
    return m ? m[1] : ''
  } catch {
    return ''
  }
}

export function isExerciseComplete(week: number, dayIndex: number, name: string) {
  return isDone('exercise', week, dayIndex, name)
}

export function isBlockComplete(week: number, dayIndex: number, items: Exercise[]) {
  return items.length > 0 && items.every((it) => isExerciseComplete(week, dayIndex, it.name))
}

export function isDayDerivedComplete(week: number, day: Day) {
  const items = day.blocks.flatMap((b) => b.items)
  return items.length > 0 && items.every((it) => isExerciseComplete(week, day.dayIndex, it.name))
}

export function isWeekDerivedComplete(week: number, plan: Plan) {
  const days = plan.weeks[week - 1]?.days ?? []
  return days.length > 0 && days.every((d) => isDayDerivedComplete(week, d))
}


