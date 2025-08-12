import { CheckCircle2, Circle } from 'lucide-react'

export interface CompletionToggleProps {
  pressed: boolean
  onToggle: () => void
  ariaLabel: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  class?: string
  stopPropagation?: boolean
}

export function CompletionToggle(props: CompletionToggleProps) {
  const { pressed, onToggle, ariaLabel, size = 'md', stopPropagation = true } = props
  const dimension =
    size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-7 w-7' : size === 'xl' ? 'h-8 w-8' : 'h-6 w-6'
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : size === 'xl' ? 'h-6 w-6' : 'h-4 w-4'
  const handleClick = (e: MouseEvent) => {
    if (stopPropagation) e.stopPropagation()
    onToggle()
  }
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={ariaLabel}
      class={
        'inline-flex items-center justify-center rounded-full border transition-colors ' +
        dimension +
        ' ' +
        (pressed ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background text-muted-foreground')
      }
      onClick={handleClick as any}
    >
      {pressed ? (
        <CheckCircle2 class={iconSize} aria-hidden="true" />
      ) : (
        <Circle class={iconSize} aria-hidden="true" />
      )}
    </button>
  )
}


