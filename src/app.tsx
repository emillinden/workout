import './app.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { plan } from '@/data/plan'
import { isDone, toggle, subscribe } from '@/lib/progress'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

export function App() {
  const [, setTick] = useState(0)
  const [week, setWeek] = useState(1)
  useEffect(() => {
    // re-render when progress changes
    return subscribe(() => setTick((t) => t + 1))
  }, [])
  const prev = () => setWeek((w) => Math.max(1, w - 1))
  const next = () => setWeek((w) => w + 1) // infinite forward
  const effectiveWeek = useMemo(() => Math.min(week, plan.meta.durationWeeks), [week])
  const current = plan.weeks[effectiveWeek - 1]
  return (
    <div class="space-y-8">
      <header class="py-6">
        <h1 class="text-3xl font-bold">Workout</h1>
        <p class="text-muted-foreground">12-week rehab → strength guide</p>
      </header>

      <Card class="mt-2">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Warm-up, main work, and cooldown each day.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="mb-2">Data loaded for {plan.meta.durationWeeks} weeks.</p>
          <Button onClick={() => setWeek(1)}>Start Week 1</Button>
        </CardContent>
      </Card>

      <div class="mt-6 space-y-4">
        <div class="flex items-center justify-center gap-4">
          <button
            class="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm disabled:opacity-50"
            onClick={prev}
            disabled={week <= 1}
            aria-label="Previous week"
          >
            <ChevronLeft class="h-4 w-4" />
            Prev
          </button>
          <div class="text-sm font-medium">Week {week}{week > plan.meta.durationWeeks ? ` (using week ${plan.meta.durationWeeks})` : ''}</div>
          <button
            class="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm"
            onClick={next}
            aria-label="Next week"
          >
            Next
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>

        <Accordion type="single" collapsible>
          {current.days.map((day) => (
            <AccordionItem key={day.dayIndex} value={`day-${day.dayIndex}`}>
              <AccordionTrigger>
                Day {day.dayIndex}: {day.name}
              </AccordionTrigger>
              <AccordionContent>
                <div class="space-y-6">
                  {day.blocks.map((block) => (
                    <div key={block.title}>
                      <h4 class="text-sm font-semibold text-muted-foreground">{block.title}</h4>
                      <ul class="mt-2 grid gap-1 md:grid-cols-2">
                        {block.items.map((it) => {
                          const done = isDone('exercise', week, day.dayIndex, it.name)

                          const chips: string[] = []
                          const p = it.prescription
                          if (p) {
                            if (p.type === 'reps') {
                              const parts = [] as string[]
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
                          }

                          return (
                            <li key={it.name} class="flex items-start justify-between gap-3 py-1">
                              <div class="min-w-0">
                                <div class={done ? 'text-sm line-through text-muted-foreground' : 'text-sm'}>{it.name}</div>
                                {chips.length > 0 && (
                                  <div class="mt-1 flex flex-wrap gap-1">
                                    {chips.map((c, idx) => (
                                      <span key={idx} class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                                        {c}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <button
                                class={done ? 'inline-flex whitespace-nowrap items-center gap-1 text-xs text-green-600' : 'inline-flex whitespace-nowrap items-center gap-1 text-xs text-muted-foreground hover:text-foreground'}
                                onClick={() => toggle('exercise', week, day.dayIndex, it.name)}
                                aria-pressed={done}
                              >
                                {done ? (<>
                                  <Check class="h-3.5 w-3.5" /> Done
                                </>) : 'Mark'}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
