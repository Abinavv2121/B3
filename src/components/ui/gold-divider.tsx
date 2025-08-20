import { cn } from '@/lib/utils'

interface GoldDividerProps {
  className?: string
  style?: React.CSSProperties
}

/**
 * Reusable gold divider component with consistent styling
 * Used to separate sections with a subtle gold accent
 */
export function GoldDivider({ className, style }: GoldDividerProps) {
  return (
    <div 
      className={cn("w-full h-0", className)}
      style={{
        borderTop: '1px solid rgba(212,175,55,0.15)',
        boxShadow: '0 -12px 24px rgba(0,0,0,0.6) inset',
        ...style
      }}
    />
  )
}
