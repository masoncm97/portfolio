import { ReadonlyURLSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { getParamValue } from '@/util/routes-helper'

export const useScrollToSelected = (params: ReadonlyURLSearchParams) => {
  const tag = getParamValue(params, 'nav')

  useEffect(() => {
    const lastViewedImageId = sessionStorage.getItem('lastViewedImage')
    if (lastViewedImageId != null && !tag) {
      const imageToScrollTo = document.getElementById(lastViewedImageId)
      imageToScrollTo?.scrollIntoView({ block: 'center' })
      sessionStorage.removeItem('lastViewedImage')
    }
  }, [])
}
