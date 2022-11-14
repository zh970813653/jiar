import React from 'react'
import styled from "@emotion/styled";
import { DevTools, loadServer } from "jira-dev-tool";
import {Button, Typography} from 'antd'
export const Row = styled.div<{
  gap?: number|boolean,
  between?: boolean,
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.between? 'space-between': undefined};
  > * {
    margin-top: 0;
    margin-bottom: ${props => props.marginBottom +'rem'};
    margin-right: ${props => typeof props.gap === 'number' ? props.gap +'rem' : props.gap || undefined };
  } 
`

export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  </FullPage>
);

export const  ButtonNoPadding  = styled(Button)`
  padding: 0
`
