import { ReadonlyURLSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useScrollToSelected = (params: ReadonlyURLSearchParams) => {
  const tagParam = params
    .toString()
    .split('&')
    .find((param) => param.includes('nav'))

  useEffect(() => {
    const lastViewedImageId = sessionStorage.getItem('lastViewedImage')
    if (lastViewedImageId != null && !tagParam) {
      const imageToScrollTo = document.getElementById(lastViewedImageId)
      imageToScrollTo?.scrollIntoView({ block: 'center' })
      sessionStorage.removeItem('lastViewedImage')
    }
  }, [])
}
