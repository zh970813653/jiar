import { useDispatch, useSelector, useStore } from "react-redux";
import { Drawer, Button } from "antd";
import React from "react";
import {
  projectsListActions,
  selectProjectModalOpen,
} from "../../store/project-list.slice";
export const ProjectModal = () => {
  const disPatch = useDispatch();
  const stroe = useStore();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  const state = stroe.getState();
  console.log(state, "state");

  // <state className="pr"></state>
  return (
    <Drawer
      width={"100%"}
      onClose={() => disPatch(projectsListActions.closePeojectModal())}
      visible={projectModalOpen}
    >
      <h1>Project Modal</h1>
      <Button
        onClick={() => disPatch(projectsListActions.closePeojectModal())}
      ></Button>
    </Drawer>
  );
};
