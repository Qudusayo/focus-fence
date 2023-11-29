import { useEffect, useState } from "react";
import {
  Container,
  ContentContainer,
  ContentBlock,
  TaskLists,
  List,
  Tab,
  Line,
  ControlButton,
} from "./StyledComponent";
// import getDayOfWeekFromDate from "../functions/getDayOfWeekFromDate";

export default function Content() {
  const [activeTab, setActiveTab] = useState<"fun" | "work" | "study">("fun");
  const [statusTab, setStatusTab] = useState<"off" | "blacklist" | "whitelist">(
    "off"
  );

  return (
    <Container>
      <Tab>
        <div
          className={activeTab === "fun" ? "active" : ""}
          onClick={() => setActiveTab("fun")}
        >
          Fun
        </div>
        <div
          className={activeTab === "work" ? "active" : ""}
          onClick={() => setActiveTab("work")}
        >
          Work
        </div>
        <div
          className={activeTab === "study" ? "active" : ""}
          onClick={() => setActiveTab("study")}
        >
          Study
        </div>
      </Tab>
      <Tab>
        <div
          className={statusTab === "off" ? "active" : ""}
          onClick={() => setStatusTab("off")}
        >
          Off
        </div>
        <div
          className={statusTab === "blacklist" ? "active" : ""}
          onClick={() => setStatusTab("blacklist")}
        >
          Blacklist
        </div>
        <div
          className={statusTab === "whitelist" ? "active" : ""}
          onClick={() => setStatusTab("whitelist")}
        >
          Whitelist
        </div>
      </Tab>
      <ContentContainer h={"150px"} bg="#fff">
        <header>Visiting Now</header>
        <h2>youtube.com</h2>
        <ControlButton>Add this website to blacklist</ControlButton>
      </ContentContainer>
      <ContentContainer h={"200px"}>
        <header>Your Blacklist:</header>
        <ContentBlock>
          <p>youtube.com</p>
          <p>facebook.com</p>
          <p>instagram.com</p>
          <p>ticktok.com</p>
          <p>twitter.com</p>
        </ContentBlock>
        <ControlButton>Edit Whitelist</ControlButton>
      </ContentContainer>
    </Container>
  );
}
