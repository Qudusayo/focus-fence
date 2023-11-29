import styled from "@emotion/styled";

import logo from "../assets/logo.png";
import { config } from "../config";

const Nav = styled.nav`
  background-color: ${config.colors.bg};
  color: ${config.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 0 0 25px 25px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-left: 15px;

  h2,
  p {
    margin: 0;
  }

  h2 {
    font-weight: bolder;
    font-size: 1.5em;
  }

  p {
    color: ${config.colors.auxiliary};
    font-size: 0.75em;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Dot = styled.div<{
  mr?: string;
}>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${config.colors.white};
  margin-right: ${(props) => props.mr || "12px"};
`;

export default function Navbar() {
  return (
    <Nav>
      <Block>
        <img src={logo} className="App-logo" alt="logo" />
        <Header>
          <h2>Focus Fence</h2>
          <p>By Workstack</p>
        </Header>
      </Block>
      <Block>
        <Dot />
        <Dot />
        <Dot mr="0" />
      </Block>
    </Nav>
  );
}
