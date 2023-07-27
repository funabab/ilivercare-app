import { useEffect } from 'react'
import { window as Window } from '@tauri-apps/api'

interface WindowProps {
  title: string
  maximized: boolean
}

export const useWindowProps = (props: Partial<WindowProps>) => {
  useEffect(() => {
    const initialize = async () => {
      if (props.title) {
        await Window.getCurrent().setTitle(props.title)
      }

      if (props.maximized) {
        await Window.getCurrent().maximize()
      }
    }

    initialize().catch((e) => console.error(e))
  }, [props])
}
