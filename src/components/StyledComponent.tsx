import styled from "@emotion/styled";
import { config } from "../config";

const Container = styled.div`
  flex: 1;
  width: 340px;
  margin: auto;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContentContainer = styled.div<{
  h: string;
  bg?: string;
}>`
  background-color: ${(props) => (props.bg ? props.bg : config.colors.bg)};
  color: ${config.colors.white};
  padding: 1.25em;
  padding-top: 1em;
  border-radius: 1em;
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* height: auto; */
  box-sizing: border-box;
  overflow: hidden;
  height: ${(props) => props.h};

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 1em;
    font-weight: 500;
    color: ${config.colors.auxiliary};
  }

  p {
    &:first-of-type {
      margin-top: 0.5em;
    }
  }

  h2 {
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 1.75em;
    color: ${config.colors.black};

    &::before {
      content: "";
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 6px;
      background-color: ${config.colors.black};
      margin-right: 8px;
    }
  }
`;

const ContentBlock = styled.div`
  flex: 1;
  height: 100px;
  /* display: flex; */
  align-items: center;
  overflow-y: auto;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #808080;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 10px;
  }
`;

const TaskLists = styled.ul`
  padding-inline-start: 0;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 2em 0 0;

  :nth-of-type(1) {
    margin-top: 0;
  }

  :last-of-type {
    margin-bottom: 0;
  }

  .scrollable {
    overflow-y: auto;
    scroll-behavior: smooth;
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #808080;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 10px;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    span:first-of-type {
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 6px;
      background-color: ${config.colors.green};
      flex: 0 0 16px;
    }
  }
`;

const List = styled.span<{
  animated?: boolean;
}>`
  text-decoration: line-through;
  color: ${(props) =>
    props.animated ? config.colors.green : config.colors.auxiliary};

  transition: color 0.5s ease-in-out;
  text-decoration-color: ${(props) =>
    props.animated ? config.colors.green : config.colors.auxiliary};
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #303030;
  gap: 9px;
  padding: 8px;
  border-radius: 24px;

  div {
    flex: 1;
    color: #808080;
    text-align: center;
    padding: 8px 0;
    border-radius: 16px;
    transition: all 0.2s;
    cursor: pointer;
    user-select: none;
    font-size: 0.9em;

    &.active {
      border-radius: 16px;
      color: white;
      background: linear-gradient(40deg, #dd0043 11.81%, #ff7c60 86.17%);
    }
  }
`;

const Line = styled.div`
  height: 1px;
  flex: 1;
  background-color: ${config.colors.green};
  margin: 0 8px;
`;

const ControlButton = styled.button`
  display: block;
  outline: none;
  border: none;
  border-radius: 1em;
  padding: 0.75em 1.25em;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${config.colors.bg};
  color: ${config.colors.white};
  font-family: "Kumbh Sans";
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s linear;
  cursor: pointer;
  background: linear-gradient(40deg, #dd0043 11.81%, #ff7c60 86.17%);
`;

export {
  Container,
  ContentContainer,
  ContentBlock,
  TaskLists,
  List,
  Tab,
  Line,
  ControlButton,
};
