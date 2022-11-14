import React from "react";
import EpicScreen from "../epic/index";
import KanBanScreen from "../kanban/index";
import { Route, Routes, Link, Navigate } from "react-router-dom";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>会员组</Link>
      <Routes>
        <Route index element={<Navigate to={'kanban'} />}></Route>
        <Route path={"/kanban"} element={<KanBanScreen />}></Route>
        <Route path={"/epic"} element={<EpicScreen />}></Route>
      </Routes>
    </div>
  );
};
