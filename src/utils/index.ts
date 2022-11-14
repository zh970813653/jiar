import { useEffect, useState,useRef } from "react";

interface personArray {
  name: string;
  age: number;
}

interface ArrayData {
  value: personArray[];
  clear: () => void;
  removeIndex: (index: number) => void;
  add: (per: personArray) => void;
}

type CleanObjectParams = {
  [key: string ]: unknown
}

export const isFalsy = (value: any) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) => value === undefined || value === null || value === "";
export const cleanObject = (object: CleanObjectParams) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb();
  }, [cb]);
};


export const useDebounce = <T>(value: T, delay: number): T => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 当value 或者 delay变化后 设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 在useEffect中 return出来的函数在下一个dom更新完成之后 执行上一个useEffect中retuen的函数
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debounceValue;
};


export const useArray = (person: personArray[]): ArrayData => {
  const [value, setValue] = useState(person);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    const copy = [...person]
    copy.splice(index,1)
    setValue(copy)
  };
  const add = (per: personArray) => {
    setValue([...value, per]);
  };
  return {
    value,
    clear,
    removeIndex,
    add,
  }
};


export const useDocumentTitle = (title:string,keepOnUnMent:boolean = true) => {
  // useRef 作用是缓存一个变量 读取这个变量不会受任何操作以及生命周期的影响
  const oldTitle = useRef(document.title).current

  // 页面初次加载时 title是 旧的title => React App
  // 加载后 title变成了新title

  useEffect(()=> {
    document.title = title
  },[title])
  useEffect(() => {
    return ()=> {
      if (!keepOnUnMent) {
        // 如果不指定依赖 读旧title
        document.title = oldTitle
      }
    }
  },[keepOnUnMent,oldTitle])
}

export const resetRouter = () => window.location.href =  window.location.origin

export const useMountedRef = () => {
  const mountedRefs= useRef(false)
  useEffect(()=> {
    mountedRefs.current = true
    return () =>  {
      mountedRefs.current = false
    }
  })
  return mountedRefs
}