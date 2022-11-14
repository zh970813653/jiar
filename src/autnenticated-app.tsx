/** @jsx jsx */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/react";
import { ReactComponent as SoftwareLogo } from "../src/assets/software-logo.svg";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screen/project-list";
import { ProjectScreen } from "screen/project/index";
import { Dropdown, Menu, Button } from "antd";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { resetRouter } from "utils";
export const AutnenticatedApp = () => {
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to={"projects"} />}></Route>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRouter}>
        <SoftwareLogo width={"18rem"} color={"red"} />
        </Button>
        
        <h3 css={{ margin: "0 1rem" }}>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button onClick={logout}>登出</Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button onClick={(e) => e.preventDefault()}>HI, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.div``;
