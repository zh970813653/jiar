import { createSlice } from "@reduxjs/toolkit";
import { User } from "screen/project-list/search-panel";
import * as auth from "auth-provider";
// import { AuthForm, bootstrapUser } from 'context/auth-context'
import { AppDispatch, RootState } from "store";
interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    setUser(state, actions) {
      state.user = actions.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

// export const login = (form: AuthForm) => (dispatch: AppDispatch) => {
//   auth.login(form).then(user => {
//     dispatch(setUser(user))
//   })
// }
// export const register = (form: AuthForm) => (dispatch: AppDispatch) => {
//   auth.register(form).then(user => {
//     dispatch(setUser(user))
//   })
// }
// export const logout = () => (dispatch: AppDispatch) => {
//   debugger
//   auth.logout().then(res => {
//     dispatch(setUser(null))
//   })
// }
// export const bootstrap = () => (dispatch: AppDispatch) => {
//   bootstrapUser().then(user => {
//     dispatch(setUser(user))
//   })
// }
