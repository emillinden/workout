# Workout data format

Here is a suggested TypeScript shape for your plan. You can copy this into `src/data/plan.ts` and export your actual plan as `const plan: Plan`.

```ts
// src/data/plan.ts
export type BlockType = 'warmup' | 'workout' | 'cooldown'

export interface Exercise {
  name: string
  // e.g. "3 x 10 @ RPE 6" or time-based: "3 x 30s"
  prescription: string
  notes?: string
}

export interface Block {
  type: BlockType
  title: string
  items: Exercise[]
}

export interface Day {
  dayIndex: number // 1..7
  title?: string // e.g. "Lower A", "Mobility"
  blocks: Block[] // warmup, workout, cooldown
}

export interface Week {
  weekIndex: number // 1..12
  focus?: string // optional theme
  days: Day[] // typically 3-6 days
}

export interface PlanMeta {
  name: string
  durationWeeks: number // 12
  author?: string
}

export interface Plan {
  meta: PlanMeta
  weeks: Week[]
}

// Example (trimmed):
export const plan: Plan = {
  meta: { name: 'Rehab to Strength', durationWeeks: 12, author: 'You' },
  weeks: [
    {
      weekIndex: 1,
      focus: 'Restore mobility and activation',
      days: [
        {
          dayIndex: 1,
          title: 'Lower A',
          blocks: [
            {
              type: 'warmup',
              title: 'Warm-up',
              items: [
                { name: 'Cat-camel', prescription: '2 x 10', notes: 'Slow and controlled' },
                { name: 'McGill curl-up', prescription: '3 x 10' },
              ],
            },
            {
              type: 'workout',
              title: 'Main',
              items: [
                { name: 'Goblet squat', prescription: '3 x 8 @ RPE 6' },
                { name: 'Hip hinge drill', prescription: '3 x 10' },
              ],
            },
            {
              type: 'cooldown',
              title: 'Cooldown',
              items: [
                { name: 'Box breathing', prescription: '5 min' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
```

How to load JSON instead
- If you prefer JSON, drop `plan.json` under `src/data/plan.json` and import it using
  `import plan from '@/data/plan.json'` (Vite supports JSON imports). Create a `src/types/plan.ts` with the types above and assert the type.

