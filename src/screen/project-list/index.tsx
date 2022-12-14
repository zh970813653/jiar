import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce} from "../../utils";
import React from "react";
import styled from "@emotion/styled";
import { Typography , Button} from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useProjectSearchParams } from "./utils";
import {Row} from '../../components/lib'
export const ProjectListScreen = (props: {setProjectModalOpen:(isOpen: boolean) => void}) => {

  const [param,setParam] = useProjectSearchParams() 
  const debounceParam = useDebounce(param,2000)
  const {isLoading, error, data:list,retry} = useProjects(debounceParam)
  const {data:users} = useUser()
  return (
    <Container>
      <Row between={true}>
          <h1>项目列表</h1>
          <Button onClick={()=>props.setProjectModalOpen(true)}>创建项目</Button>
      </Row>
      
      <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
      {error? <Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
      <List setProjectModalOpen={props.setProjectModalOpen} refresh={retry} dataSource={list as any|| []} loading={isLoading} users={users || []}></List>
    </Container>
  );
};


const Container = styled.div`
  padding: 3.2rem;
`