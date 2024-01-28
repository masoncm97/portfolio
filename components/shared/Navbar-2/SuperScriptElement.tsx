import { LinkArrow } from '@/components/svg'

interface SuperScriptElementProps {
  children: React.ReactNode
  superScript?: string
}

export const SuperScriptElement = ({
  children,
  superScript,
}: SuperScriptElementProps) => {
  return (
    <div className="flex gap-1">
      {children}
      {superScript ? (
        <div className="text-xxs">{superScript}</div>
      ) : (
        <LinkArrow className="h-[.45rem]" />
      )}
    </div>
  )
}
