import React from "react";
import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";

interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number
} 
interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
  refresh: ()=> void
}
// type PropsType = Omit<ListProps,'users'>
export const List = ({ users, ... props }: ListProps) => {
  const {mutate} = useEditProject()
  const pinProject = (id:number) =>  async (pin:boolean) => {
    await mutate({id,pin})
    await props.refresh()
  }
  return ( 
    <Table
      pagination={false}
      rowKey="id"
      {...props}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(value,project){
            return (
              <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}></Pin>
            )
            
          }
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value,project){
            return (<Link to={`${project.id}`}>{project.name}</Link>)
          }
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.id)?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created ? dayjs(project.created).format('YYYY-MM-DD'): '暂无'}
              </span>
            );
          },
        }
      ]}
    ></Table>
  );
};
