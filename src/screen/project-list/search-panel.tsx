/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { Input, Select, Form } from "antd";
import { Project } from "type/project";
import { UserSelect } from "components/user-select";
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[]; 
  param: Partial<Pick<Project,'name'|'personId'>>
  // param: {
  //   name: string;
  //   personId: string;
  // };
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ param, users, setParam }: SearchPanelProps) => {
  const FormStyle = {
    display: 'flex',
    marginBottom: '2rem'
  }
  return (
    <Form css={FormStyle}>
      <Form.Item  css={{ width: "18rem",marginRight:'1rem' }}>
        <Input
          type="text"
          value={param.name}
          placeholder={"项目名称"}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item  css={{ width: "12rem" }}>
      <UserSelect 
          defaultOptionName="负责人"
          value={param.personId}     
          onChange={(value) => {
            setParam({ ...param, personId: value });
          }}></UserSelect>
        {/* <Select
          value={param.personId}
          onChange={(value) => {
            setParam({ ...param, personId: value });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => {
            return (
              
              <Select.Option value={`${user.id}`} key={`${user.id}`}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select> */}
      </Form.Item>
    </Form>
  );
};
