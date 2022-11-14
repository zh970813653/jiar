import {useMemo} from 'react'
import { useUrlQueryParams } from "utils/url"

export const useProjectSearchParams = () => {
  const [param,setParam] = useUrlQueryParams(['name','personId'])
  return [
    useMemo(()=> {
      return {
        ...param,
        personId: toNum(param, 'personId')
      }
    },[param]),
    setParam
  ] as const
}



const toNum =<T, K extends keyof T> (data: T, key:K) : number | undefined=> {
  return Number(data[key]) || undefined
}