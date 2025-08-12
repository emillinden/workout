import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Wide-accepting className combiner that plays nice with Preact Signalish types
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

