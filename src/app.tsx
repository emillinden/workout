import './app.css'
// removed header/intro card imports
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
// removed unused Button
import { plan } from '@/data/plan'
import { isDone, toggle, subscribe, setManyExerciseDone } from '@/lib/progress'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { CompletionToggle } from '@/components/completion-toggle'
import { BlockSection } from '@/components/block-section'
import { ExerciseItem } from '@/components/exercise-item'
import { isDayDerivedComplete, isWeekDerivedComplete } from '@/lib/derive'

export function App() {
  const [tick, setTick] = useState(0)
  const [week, setWeek] = useState(1)
  const [mediaOpen, setMediaOpen] = useState<Record<string, boolean>>({})
  useEffect(() => {
    // re-render when progress changes
    return subscribe(() => setTick((t) => t + 1))
  }, [])
  const prev = () => setWeek((w) => Math.max(1, w - 1))
  const next = () => setWeek((w) => w + 1) // infinite forward
  const effectiveWeek = useMemo(() => Math.min(week, plan.meta.durationWeeks), [week])
  const current = plan.weeks[effectiveWeek - 1]

  // Compute derived completion
  // helper available if needed
  // const isExerciseDone = (w: number, d: number, name: string) => isDone('exercise', w, d, name)
  const isDayExplicitDone = (w: number, d: number) => isDone('day', w, d)
  const isDayDerivedDone = (w: number, dIndex: number) => {
    const day = plan.weeks[w - 1]?.days.find((d) => d.dayIndex === dIndex)
    if (!day) return false
    return isDayDerivedComplete(w, day)
  }
  const isDayDoneTotal = (w: number, dIndex: number) => isDayExplicitDone(w, dIndex) || isDayDerivedDone(w, dIndex)
  const isWeekExplicitDone = (w: number) => isDone('week', w)
  const isWeekDerivedDone = (w: number) => isWeekDerivedComplete(w, plan)
  const isWeekDoneTotal = (w: number) => isWeekExplicitDone(w) || isWeekDerivedDone(w)

  const autoWeek = useMemo(() => {
    const total = plan.meta.durationWeeks
    for (let w = 1; w <= total; w++) {
      if (!isWeekDoneTotal(w)) return w
    }
    return total
  }, [tick, plan.meta.durationWeeks])

  // Auto-select current week based on completion
  useEffect(() => {
    if (week !== autoWeek) setWeek(autoWeek)
  }, [autoWeek])

  // moved to lib/derive
  return (
    <div class="space-y-6">
      <div class="mt-2 space-y-4">
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
          <div class="flex items-center gap-2 text-sm font-medium">
            <CompletionToggle
              pressed={isWeekDoneTotal(effectiveWeek)}
              ariaLabel={isWeekDoneTotal(effectiveWeek) ? 'Mark week as not done' : 'Mark week as done'}
              size="xl"
              stopPropagation={false}
              onToggle={() => {
                const willBeDone = !isWeekDerivedDone(effectiveWeek)
                const days = plan.weeks[effectiveWeek - 1]?.days ?? []
                const entries = days.flatMap((d) => d.blocks.flatMap((b) => b.items.map((it) => ({
                  week: effectiveWeek,
                  day: d.dayIndex,
                  exerciseName: it.name,
                }))))
                setManyExerciseDone(entries, willBeDone)
              }}
            />
            <span>Week {effectiveWeek}</span>
          </div>
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
                <div class="flex w-full items-center justify-between gap-3 pr-2">
                  <div class="flex items-center gap-2 truncate">
                    <CompletionToggle
                      pressed={isDayDoneTotal(effectiveWeek, day.dayIndex)}
                      ariaLabel={isDayDoneTotal(effectiveWeek, day.dayIndex) ? 'Mark day as not done' : 'Mark day as done'}
                      size="xl"
                      onToggle={() => {
                        const willBeDone = !isDayDerivedDone(effectiveWeek, day.dayIndex)
                        const entries = day.blocks.flatMap((b) => b.items.map((it) => ({
                          week: effectiveWeek,
                          day: day.dayIndex,
                          exerciseName: it.name,
                        })))
                        setManyExerciseDone(entries, willBeDone)
                      }}
                    />
                    <span>
                      Day {day.dayIndex}: {day.name}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div class="space-y-6">
                  {day.blocks.map((block) => (
                    <div key={block.title}>
                      <BlockSection
                        week={effectiveWeek}
                        dayIndex={day.dayIndex}
                        block={block}
                        onToggleBlock={(willBeDone) => {
                          const entries = block.items.map((it) => ({
                            week: effectiveWeek,
                            day: day.dayIndex,
                            exerciseName: it.name,
                          }))
                          setManyExerciseDone(entries, willBeDone)
                        }}
                      />
                      <ul class="mt-2 grid gap-2 sm:grid-cols-2">
                         {block.items.map((it) => {
                           const done = isDone('exercise', effectiveWeek, day.dayIndex, it.name)

                           const mediaKey = `${effectiveWeek}:${day.dayIndex}:${it.name}`
                           const open = !!mediaOpen[mediaKey]
                           return (
                             <ExerciseItem
                               key={it.name}
                               week={effectiveWeek}
                               dayIndex={day.dayIndex}
                               exercise={it}
                               done={done}
                               onToggle={() => toggle('exercise', effectiveWeek, day.dayIndex, it.name)}
                               mediaOpen={open}
                               setMediaOpen={(v) => setMediaOpen((prev) => ({ ...prev, [mediaKey]: v }))}
                             />
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

        <div class="pt-4">
          <button
            class="inline-flex items-center gap-2 rounded-md bg-destructive px-3 py-2 text-sm text-destructive-foreground hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 ring-offset-background"
            onClick={() => {
              if (confirm('Clear all progress and start over?')) {
                import('@/lib/progress').then((m) => m.resetAllProgress())
              }
            }}
          >
            <RotateCcw class="h-4 w-4" /> Reset progress
          </button>
        </div>
      </div>
    </div>
  )
}
