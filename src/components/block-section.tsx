import { CompletionToggle } from '@/components/completion-toggle'
import { isBlockComplete } from '@/lib/derive'
import type { Block } from '@/types/plan'
import { Dumbbell, Flame, Snowflake } from 'lucide-react'

interface Props {
  week: number
  dayIndex: number
  block: Block
  onToggleBlock: (willBeDone: boolean) => void
}

export function BlockSection(props: Props) {
  const { week, dayIndex, block, onToggleBlock } = props
  const blockDone = isBlockComplete(week, dayIndex, block.items)
  return (
    <div>
      <div class="flex items-center justify-between">
        <h4 class="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          {block.type === 'warmup' ? <Flame class="h-4 w-4" /> : block.type === 'cooldown' ? <Snowflake class="h-4 w-4" /> : <Dumbbell class="h-4 w-4" />}
          {block.title}
        </h4>
        <CompletionToggle
          pressed={blockDone}
          ariaLabel={`Toggle ${block.title}`}
          size="md"
          onToggle={() => onToggleBlock(!blockDone)}
        />
      </div>
    </div>
  )
}


