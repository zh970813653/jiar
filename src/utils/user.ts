import {useCallback} from 'react'
import { User } from "screen/project-list/search-panel";
import { useAsync } from "utils/use-async";
import { useMount } from "utils";
import {getUser} from 'request/auth/index'
export const useUser = (params?:Partial<User>) => {
  const {run,...result} = useAsync<User[]>()
  useMount(useCallback(async () => {
    run(getUser())
  },[run])) 
  return result
}