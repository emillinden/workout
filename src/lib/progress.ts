// Simple localStorage-backed store for tracking completion
export type CompletionKind = 'exercise' | 'day' | 'week'

export interface CompletionState {
  // keys: e.g. ex:w1:d1:Bird Dog, day:w1:d1, week:w1
  done: Record<string, boolean>
}

const KEY = 'workout:completion:v1'

function load(): CompletionState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { done: {} }
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.done && typeof parsed.done === 'object') {
      return { done: parsed.done as Record<string, boolean> }
    }
  } catch {}
  return { done: {} }
}

function save(state: CompletionState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

let state = load()
const listeners = new Set<() => void>()

export function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function notify() {
  save(state)
  for (const fn of listeners) fn()
}

function keyFor(kind: CompletionKind, week: number, day?: number, exerciseName?: string) {
  const base = kind === 'week' ? `week:w${week}` : kind === 'day' ? `day:w${week}:d${day}` : `ex:w${week}:d${day}:${exerciseName}`
  return base
}

export function isDone(kind: CompletionKind, week: number, day?: number, exerciseName?: string) {
  return !!state.done[keyFor(kind, week, day, exerciseName)]
}

export function toggle(kind: CompletionKind, week: number, day?: number, exerciseName?: string) {
  const k = keyFor(kind, week, day, exerciseName)
  state.done[k] = !state.done[k]
  notify()
}

export function resetAllProgress() {
  state.done = {}
  notify()
}

// Set a specific exercise completion state explicitly
export function setExerciseDone(week: number, day: number, exerciseName: string, value: boolean) {
  const k = keyFor('exercise', week, day, exerciseName)
  state.done[k] = value
  notify()
}

// Batch-set multiple exercises and notify once
export function setManyExerciseDone(
  entries: Array<{ week: number; day: number; exerciseName: string }>,
  value: boolean
) {
  for (const { week, day, exerciseName } of entries) {
    const k = keyFor('exercise', week, day, exerciseName)
    state.done[k] = value
  }
  notify()
}

