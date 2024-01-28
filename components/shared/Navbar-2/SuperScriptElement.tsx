export const SuperScriptElement = ({
  children,
  superScript,
}: {
  children: React.ReactNode
  superScript: string
}) => {
  return (
    <div className="flex">
      {children}
      <div className="text-xxs">{superScript}</div>
    </div>
  )
}
