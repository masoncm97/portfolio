import TextElement from '@/components/shared/TextElement'
import { LinkArrow } from '@/components/svg'
import { TextSize } from '@/types'

interface SuperScriptElementProps {
  title: string | undefined
  superScript?: string
  size?: TextSize
}

export const SuperScriptElement = ({
  title,
  superScript,
  size = TextSize.md,
}: SuperScriptElementProps) => {
  return (
    <div className="flex gap-1">
      <TextElement size={size}>{title}</TextElement>
      {superScript ? (
        <TextElement size={TextSize.xxs}>{superScript}</TextElement>
      ) : (
        <LinkArrow className="h-[.45rem]" />
      )}
    </div>
  )
}
