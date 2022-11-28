import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
export interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  initialState,
  name: "projectListSlice",
  reducers: {
    openPeojectModal(state) {
      // 这里不用返回一个新的state是因为toolkit底层用了一个叫immer的库 内部帮我们实现了这个逻辑
      state.projectModalOpen = true;
    },
    closePeojectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectsListActions = projectListSlice.actions;

export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
