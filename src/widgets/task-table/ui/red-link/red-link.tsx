import { ReactNode } from "react";
import styled from "styled-components";

export  const RedLink = styled(RedLinkFC)`
  color: red;

  &:hover {
    color: #ff0000aa
  }
`;

function RedLinkFC({children, onClick, ...props}: { children?: ReactNode, onClick?: () => void }) {
  return (
    <a {...props} onClick={onClick}>{children}</a>
  )
}