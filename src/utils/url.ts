import {useSearchParams,URLSearchParamsInit} from 'react-router-dom'
import {useMemo} from 'react'
import { cleanObject } from 'utils'

export const useUrlQueryParams = <T extends string>(keys: T[]) => {
  const [searchParams,setSearchParams] = useSearchParams()
  return [
    useMemo(
      ()=>{
      return keys.reduce((pre,currentkey)=>{
        return {
          ...pre,
          [currentkey]:searchParams.get(currentkey) || ''
        }
      },{} as {[currentkey in T]: string})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchParams]),
    (params: Partial<{[key in T]:unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams),...params})  as URLSearchParamsInit
      return  setSearchParams(o)
    }
  ] as const
}

