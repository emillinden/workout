import { CompletionToggle } from '@/components/completion-toggle'
import { buildPrescriptionChips, extractYouTubeId } from '@/lib/derive'
import type { Exercise } from '@/types/plan'
import { Video, Image as ImageIcon } from 'lucide-react'

interface Props {
  week: number
  dayIndex: number
  exercise: Exercise
  done: boolean
  onToggle: () => void
  mediaOpen: boolean
  setMediaOpen: (open: boolean) => void
}

export function ExerciseItem(props: Props) {
  const { exercise: it, done, onToggle, mediaOpen, setMediaOpen } = props
  const chips = buildPrescriptionChips(it.prescription)

  return (
    <li
      class={
        'group rounded-md border p-3 transition-colors hover:bg-accent cursor-pointer ' +
        (done ? 'bg-emerald-50 border-emerald-200' : '')
      }
      role="button"
      tabIndex={0}
      onClick={onToggle as any}
      onKeyDown={(e) => {
        if ((e as any).key === 'Enter' || (e as any).key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-pressed={done}
    >
      <div class="flex items-center gap-3">
        <CompletionToggle
          pressed={done}
          ariaLabel={done ? 'Mark exercise as not done' : 'Mark exercise as done'}
          size="xl"
          onToggle={onToggle}
        />
        <div class="min-w-0 flex-1 flex items-center gap-2">
          <span class={done ? 'truncate text-sm font-semibold line-through text-muted-foreground' : 'truncate text-sm font-semibold'}>
            {it.name}
          </span>
          {chips.length > 0 && (
            <div class="flex max-w-full flex-nowrap items-center gap-1 overflow-hidden">
              {chips.map((c, idx) => (
                <span key={idx} class="shrink-0 inline-flex items-center rounded-full bg-foreground/5 px-2 py-0.5 text-[11px] leading-4 text-foreground/70">
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
        {it.media && it.media.length > 0 && (
          <button
            type="button"
            class={
              'inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs transition-colors ' +
              (mediaOpen ? 'border-primary text-primary' : 'text-muted-foreground hover:text-foreground')
            }
            aria-expanded={mediaOpen}
            aria-label={mediaOpen ? 'Hide media' : 'Show media'}
            title={mediaOpen ? 'Hide media' : 'Show media'}
            onClick={(e) => {
              e.stopPropagation()
              setMediaOpen(!mediaOpen)
            }}
          >
            {it.media.some((m) => m.kind === 'youtube' || m.kind === 'youtubeSearch' || m.kind === 'video') ? (
              <Video class="h-4 w-4" />
            ) : (
              <ImageIcon class="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {it.media && it.media.length > 0 && mediaOpen && (
        <div class="mt-3 flex flex-wrap gap-3">
          {it.media.map((m, midx) => (
            <div key={midx} class="w-full sm:w-auto">
              {m.kind === 'youtube' ? (
                <div class="aspect-video w-full max-w-md overflow-hidden rounded-md border bg-black">
                  <iframe
                    class="h-full w-full"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(m.url)}`}
                    title={m.title || it.name}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : m.kind === 'youtubeSearch' ? (
                <div class="aspect-video w-full max-w-md overflow-hidden rounded-md border bg-black">
                  <iframe
                    class="h-full w-full"
                    src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(m.url)}`}
                    title={m.title || it.name}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : m.kind === 'video' ? (
                <video class="max-w-md rounded-md border" src={m.url} controls poster={m.thumbnailUrl} />
              ) : (
                <img class="max-h-48 max-w-md rounded-md border object-cover" src={m.url} alt={m.title || it.name} />
              )}
            </div>
          ))}
        </div>
      )}
    </li>
  )
}


