import { useState,useEffect,useCallback} from "react";
import {AxiosResponse} from 'axios'
import { useMountedRef } from "utils";
interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};
const defaultConfig = {
  throwOnError: false
}

// const _initSetState =  (setFunc:(data: any)=>void) :Promise<any> => {
//   return new Promise((resolve,rejects) => {
//     setFunc(data)
//     resolve(true)
//   })
// }

export const useAsync = <T>(initialState?: State<T>,initialConfig?: typeof defaultConfig) => {
  const config = {
    ...defaultConfig,
    initialConfig
  }
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });

  const [retry,setRetry] = useState(()=> {
    return () => {
       
    }
  })
  const mountedRef= useMountedRef()

  const setData = useCallback((data: T) => {
    setState({
      data,
      error: null,
      stat: 'success'
    })
  },[])


  const setError = useCallback((error: Error) => {
    setState({
      data: null,
      error,
      stat: 'error'
    })
  },[])

  const run = useCallback((promise: Promise<any>,   runConfig?: {retry:()=>Promise<any>}) => {
    try {
      if(!promise || !promise.then){
        throw new Error('Data of type promise must be passed in')
      }
      setRetry(() =>  {
        return ()=> {
          if (runConfig?.retry) {
             run(runConfig?.retry(),runConfig)
          }
        }
      })
  
      setState((preState) => ({...preState, stat: 'loading'}) )
      promise.then(result => {
        if (mountedRef.current) {
          setData(result.data)
          return result.data
        }
        
      })
    } catch (error: any) {
      setError(error)
      if (config.throwOnError) {
        return Promise.reject(error)
      }
      return error
    }
  },[config.throwOnError, mountedRef, setData, setError])

  return {
    isIdle: state.stat === 'idle',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    isLoading: state.stat === 'loading',
    run,
    setData,
    setError,
    retry,
    // config
    ...state
  }
};
