import { Layout, TextSize, Theme, ViewMode, ViewModeCollection } from '@/types'
import { useCallback, useContext } from 'react'
import { ThemeContext } from '@/app/providers/ThemeProvider'
import classNames from 'classnames'
import TextElement from '../TextElement'
import { LayoutContext } from '@/app/providers/LayoutProvider'

export interface ViewModesProps {
  viewModeCollections: ViewModeCollection<ViewMode>[]
}
export const ViewModes = ({
  viewModeCollections,
}: {
  viewModeCollections: ViewModeCollection<ViewMode>[]
}) => {
  let themes = viewModeCollections.find(
    (viewMode) => viewMode.title == 'Theme',
  ) as ViewModeCollection<Theme>

  let layouts = viewModeCollections.find(
    (viewMode) => viewMode.title == 'Layout',
  ) as ViewModeCollection<Layout>

  console.log(themes)
  console.log(layouts)

  const { currentTheme, setCurrentTheme } = useContext(ThemeContext)
  const { currentLayout, setCurrentLayout } = useContext(LayoutContext)

  console.log(currentTheme)

  const clickTheme = useCallback(
    (theme: Theme) => {
      console.log('y', theme)
      setCurrentTheme(theme)
    },
    [setCurrentTheme],
  )

  const clickLayout = useCallback(
    (layout: Layout) => {
      console.log('y', layout)
      setCurrentLayout(layout)
    },
    [setCurrentLayout],
  )

  return (
    <>
      <div className="flex gap-x-3">
        {themes.viewModes.map((theme) => (
          <button
            key={theme.title}
            onClick={() => clickTheme(theme)}
            className={classNames(
              currentTheme.title == theme.title ? 'opacity-100' : 'opacity-40',
              'flex gap-x-3',
            )}
          >
            <TextElement size={TextSize.md} key={theme.title}>
              {theme.title}
            </TextElement>
          </button>
        ))}
      </div>
      <div className="flex gap-x-3">
        {layouts.viewModes.map((layout) => (
          <button
            key={layout.title}
            onClick={() => clickLayout(layout)}
            className={classNames(
              currentLayout.title == layout.title
                ? 'opacity-100'
                : 'opacity-40',
              'flex gap-x-3',
            )}
          >
            <TextElement size={TextSize.md} key={layout.title}>
              {layout.title}
            </TextElement>
          </button>
        ))}
      </div>
    </>
  )
}
