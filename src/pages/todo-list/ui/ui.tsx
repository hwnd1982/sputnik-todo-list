import {Layout } from 'antd';
import styled from 'styled-components';
import { ServerState } from '../../../shared';

const { Header: HeaderFC, Content: ContentFC } = Layout;

export const Header = styled(HeaderFC)`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
`;

export const Content = styled(ContentFC)<{$bgColor: string}>`
  margin: 0;
  padding: 24px;
  background-color: ${props => props.$bgColor};
`;

export const Title = styled.h3`
  margin: 0;
  color: #fff;
`;

export const Status = styled.p`
  display: flex;
  align-items: center;
`;

const colorBgServerState = {
  "idle": 'grey',
  "offline": 'grey',
  "pending": 'blue',
  "fulfilled": 'green',
  "rejected": 'red',
};

export const StatusMarker = styled.span<{$state: ServerState}>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: rgba(0, 0, 0, .9) 3px 1px 10px 1px inset;
  background-color: ${props => colorBgServerState[props.$state]};
  transition: .4s;
`;

export const StatusText = styled.span`
  min-width: 60px;
  text-align: right;
  color: white;
`;