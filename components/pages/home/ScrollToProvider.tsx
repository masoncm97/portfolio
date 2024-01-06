// 'use client'

// import { useEffect } from 'react'

interface ScrollToProviderProps {
  children: React.ReactNode
}

export default function ScrollToProvider({ children }: ScrollToProviderProps) {
  //   const searchParams = useSearchParams()
  //   const pathName = usePathname()

  //   useEffect(() => {
  //     const lastViewedImageId = sessionStorage.getItem('lastViewedImage')
  //     console.log(lastViewedImageId)
  //     if (lastViewedImageId != null) {
  //       const imageToScrollTo = document.getElementById(lastViewedImageId)
  //       imageToScrollTo?.scrollIntoView()
  //       sessionStorage.removeItem('lastViewedImage')
  //     }
  //   }, [])

  return <ScrollToProvider>{children}</ScrollToProvider>
}
