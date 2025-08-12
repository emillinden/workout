// Rich, strictly-typed plan model for maximum flexibility

export type BlockType = 'warmup' | 'workout' | 'cooldown'

export interface ShowIf {
  minWeek?: number
  maxWeek?: number
  onlyDays?: number[] // 1..7
}

export type PrescriptionType =
  | 'none'
  | 'reps'        // sets x reps (+ optional tempo)
  | 'time'        // total or per-set seconds
  | 'steps'       // sets x steps
  | 'hold'        // sets x seconds hold
  | 'distance'    // meters, optional pace
  | 'intensity'   // HR%, RPE, etc.
  | 'mixed'       // fallback freeform

export interface Prescription {
  type: PrescriptionType
  sets?: number
  reps?: number
  seconds?: number
  steps?: number
  tempoSeconds?: number
  distanceMeters?: number
  restSeconds?: number
  rpe?: number // 1-10
  loadPercent?: number // 0-100 (of 1RM)
  heartRatePercent?: number // 0-100
  pace?: string // e.g. "5:30/km"
  detail?: string // freeform
}

export interface ExerciseMeta {
  equipment?: string[] // e.g. ['band', 'dumbbell']
  category?: string // e.g. 'core', 'hinge', 'push', 'pull', 'conditioning'
  unilateral?: boolean
  side?: 'left' | 'right' | 'both'
  tags?: string[]
}

export interface Exercise {
  id?: string
  name: string
  prescription: Prescription
  display?: string // human-readable fallback
  notes?: string
  showIf?: ShowIf
  meta?: ExerciseMeta
}

export interface Block {
  id?: string
  type: BlockType
  title: string
  items: Exercise[]
}

export interface Day {
  dayIndex: number // 1..7
  name: string
  focus?: string
  blocks: Block[]
}

export interface Week {
  weekIndex: number // 1..N
  focus?: string
  days: Day[]
}

export interface PlanMeta {
  id?: string
  version?: string
  name: string
  durationWeeks: number
  author?: string
  createdAt?: string
}

export interface Plan {
  meta: PlanMeta
  weeks: Week[]
}

