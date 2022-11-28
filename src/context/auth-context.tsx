import React, { useContext, useState, ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "screen/project-list/search-panel";
// import { getUser } from "request/auth";
import { useMount } from "utils";
interface AuthForm {
  username: string;
  password: string;
}
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    user = auth.getUserInfo();
  }
  return user;
};
const AnthContent = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AnthContent.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user as User | null));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then((user) => setUser(null));

  useMount(
    useCallback(async () => {
      const user = await bootstrapUser();
      setUser(user);
    }, [])
  );

  const userParmas = {
    user,
    login,
    register,
    logout,
  };
  return <AnthContent.Provider value={userParmas} children={children} />;
};

export const useAuth = () => {
  const context = useContext(AnthContent);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};

// import React, { useContext, useState,ReactNode,useCallback } from "react";
// import * as auth from 'auth-provider'
// import * as authStore from 'store/auth.slice'
// import { User } from "screen/project-list/search-panel";
// // import { getUser } from "request/auth";
// import { useMount } from "utils";
// import { useDispatch, useSelector } from "react-redux";
// import { useAsync } from "utils/use-async";
// export interface AuthForm {
//   username: string,
//   password: string
// }
// export const bootstrapUser = async () => {
//   let user = null
//   const token = auth.getToken()
//   if(token) {
//      user = auth.getUserInfo()
//   }
//   return user
// }

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const {run} = useAsync()
//   const disPatch: (...args: unknown[]) => Promise<User> = useDispatch()
//   useMount(useCallback(async ()=> {
//     // const user = await bootstrapUser()
//     run(disPatch(authStore.bootstrap()))
//     // disPatch(await bootstrapUser())
//     // run(disPatch(authStore.bootstrap()))
//   },[disPatch, run]) )
//   return <div>
//     {children}
//   </div>
// }

// export const useAuth = () => {
//   const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
//   const user = useSelector(authStore.selectUser)
//   debugger
//   const login = useCallback((form: AuthForm)=> dispatch(authStore.login(form)),[dispatch])
//   const register = useCallback((form: AuthForm)=>dispatch(authStore.register(form)),[dispatch])
//   const logout =  useCallback(()=>dispatch(authStore.logout()),[dispatch])

//   return {
//     user,
//     login,
//     register,
//     logout
//   }
// }
