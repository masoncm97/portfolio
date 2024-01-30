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

  const { currentTheme, dispatch, auto, setAuto } = useContext(ThemeContext)
  const { currentLayout, setCurrentLayout } = useContext(LayoutContext)

  const clickTheme = useCallback(
    (title: string) => {
      switch (title) {
        case 'Auto': {
          dispatch({ type: 'SET_AUTO' })
          setAuto(true)
          return
        }
        case 'Light': {
          dispatch({ type: 'SET_LIGHT' })
          setAuto(false)
          return
        }
        case 'Dark': {
          dispatch({ type: 'SET_DARK' })
          setAuto(false)
          return
        }
      }
    },
    [dispatch],
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
            onClick={() => clickTheme(theme.title)}
            className={classNames(
              auto ? 'opacity-40' : '',
              currentTheme.title == theme.title ? 'opacity-100' : 'opacity-40',
              'flex gap-x-3',
            )}
          >
            <TextElement size={TextSize.md} key={theme.title}>
              {theme.title}
            </TextElement>
          </button>
        ))}
        <button
          onClick={() => clickTheme('Auto')}
          className={classNames(
            auto ? 'opacity-100' : 'opacity-40',
            'flex gap-x-3',
          )}
        >
          <TextElement size={TextSize.md}>Auto</TextElement>
        </button>
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
