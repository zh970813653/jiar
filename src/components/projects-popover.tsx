import React from "react";
import styled from "@emotion/styled";
import { Popover, Typography, List, Divider } from "antd";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";
import { useDispatch } from "react-redux";
import { projectsListActions } from "store/project-list.slice";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();
  const dispatch = useDispatch();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <div style={{ width: "30rem" }}>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project, index) => {
          return (
            <List.Item key={index}>
              <List.Item.Meta title={project.name}></List.Item.Meta>
            </List.Item>
          );
        })}
      </List>
      <Divider />
      <ButtonNoPadding
        type="link"
        onClick={() => dispatch(projectsListActions.openPeojectModal())}
      >
        创建项目
      </ButtonNoPadding>
    </div>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span style={{ margin: "0 1.5rem" }}>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: "30rem";
`;
