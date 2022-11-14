import { useAsync } from "utils/use-async";
import { Project } from "type/project";
import { useEffect,useCallback } from "react";
import { cleanObject } from "utils";
import { getProjects, collect, addCollect } from "request/auth/index";

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const reuqstProjects = useCallback(() => getProjects(cleanObject(params || {})), [params])
  useEffect(() => {
    run(reuqstProjects(), { retry: reuqstProjects });
  }, [params, reuqstProjects, run]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(collect(params));
  };
  return {
    mutate,
    asyncResult,
  };
};

export const useAppProject = () => {
  const { run, ...asyncResult } = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(addCollect(params));
  };
  return {
    mutate,
    asyncResult,
  };
};
