import styled from "styled-components";

export const StyledNavbar = styled.nav`
  background: #698f9b;
  height: 35px;
  box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const StyledNavOptions = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

export const StyledLink = styled.div`
  :hover {
    background: #008cba;
  }
  text-align: center;
  margin: 0px 0px 0px 20px;
`;
