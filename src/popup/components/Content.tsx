import React, { useEffect, useState } from "react";
import {
  Container,
  ContentContainer,
  ContentBlock,
  Tab,
  ControlButton,
} from "./StyledComponent";
import { PiGearSix } from "react-icons/pi";
import Image from "./Image";
import "../../assets/tailwind.css";
// import getDayOfWeekFromDate from "../functions/getDayOfWeekFromDate";

export default function Content() {
  const [activeTab, setActiveTab] = useState<"fun" | "work" | "study">("fun");
  const [statusTab, setStatusTab] = useState<"blacklist" | "whitelist">(
    "blacklist"
  );
  const [currentUrl, setCurrentUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [categoryList, setCategoryList] = useState<
    {
      url: string;
      faviconUrl: string;
    }[]
  >([]);

  useEffect(() => {
    // Get the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        const tab = tabs[0];
        const url = tab.url;
        const favIconUrl = tab.favIconUrl; // Retrieve the favicon URL

        let baseDomain: string;

        if (url.includes("?site=")) {
          baseDomain = url.split("?site=")[1];
        } else {
          baseDomain = extractBaseDomain(url);
        }
        setCurrentUrl(baseDomain);

        setFaviconUrl(favIconUrl);
      }
    });

    chrome.storage.sync.get(["currentMode"], function (result) {
      if (result.currentMode) setActiveTab(result.currentMode);
    });
  }, []);

  useEffect(() => {
    // Get the current active tab to chrome storage
    chrome.storage.sync.set({ currentMode: activeTab }, function () {
      // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //   chrome.tabs.sendMessage(tabs[0].id, { message: "reload_page" });
      // });
    });

    chrome.storage.sync.get(["currentMode"], function (result) {
      const currentMode = result.currentMode;

      if (currentMode) {
        setActiveTab(currentMode);

        // Get elemnets of [activeTab + "_blacklist"] from storage
        chrome.storage.sync.get(
          [`${currentMode}_${statusTab}`],
          function (result) {
            const blacklist = result[`${currentMode}_${statusTab}`];
            setCategoryList(blacklist ?? []);
          }
        );
      }
    });
  }, [activeTab, statusTab]);

  // Function to extract base domain from URL
  const extractBaseDomain = (url: string) => {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  };

  const addToBlacklist = () => {
    // Add the current url to blacklist for the current mode (fun, work, study) adding the site url and favicon url into array of blacklist for the current mode
    chrome.storage.sync.get([activeTab + "_blacklist"], function (result) {
      const blacklist = result[activeTab + "_blacklist"];
      if (blacklist && blacklist.length > 0) {
        blacklist.push({
          url: currentUrl,
          faviconUrl: faviconUrl,
        });
        chrome.storage.sync.set(
          { [activeTab + "_blacklist"]: blacklist },
          function () {
            console.log("Blacklist is set to " + blacklist);
          }
        );
      } else {
        chrome.storage.sync.set(
          {
            [activeTab + "_blacklist"]: [
              {
                url: currentUrl,
                faviconUrl: faviconUrl,
              },
            ],
          },
          function () {
            console.log("Blacklist is set to " + blacklist);
          }
        );
      }
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "reload_page" });
    });
  };

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
          className={statusTab === "blacklist" ? "active" : ""}
          onClick={() => setStatusTab("blacklist")}
        >
          Blacklist
        </div>
        <div
          className={statusTab === "whitelist" ? "active-white" : ""}
          onClick={() => setStatusTab("whitelist")}
        >
          Whitelist
        </div>
      </Tab>
      <ContentContainer
        h={"150px"}
        bg="#fff"
        style={
          {
            // background: "linear-gradient(40deg, #dd0043 11.81%, #ff7c60 86.17%)",
          }
        }
        favIconUrl={faviconUrl}
      >
        <header>Visiting Now</header>
        <h2>{currentUrl}</h2>
        <ControlButton onClick={addToBlacklist}>
          Add this website to blacklist
        </ControlButton>
      </ContentContainer>

      <ContentContainer h={"200px"}>
        <header>
          Your {statusTab === "blacklist" ? "Blacklist" : "Whitelist"}:
        </header>
        <ContentBlock>
          {!categoryList.length ? (
            <p
              style={{
                textAlign: "center",
                color: "#999",
                fontSize: "14px",
                margin: "0",
                padding: "0",
                marginTop: "40px",
              }}
            >
              ----- {statusTab === "blacklist" ? "Blacklist" : "Whitelist"} is
              empty -----
            </p>
          ) : (
            <div>
              {categoryList.map((list) => {
                return (
                  <div key={list.url} className="flex items-center gap-2 my-2">
                    <Image src={list.faviconUrl} />
                    <span>{list.url}</span>
                  </div>
                );
              })}
            </div>
          )}
        </ContentBlock>
        <ControlButton whitelist={statusTab === "whitelist"}>
          <PiGearSix size={15} />
          <span>
            Edit {statusTab === "blacklist" ? "Blacklist" : "Whitelist"}
          </span>
        </ControlButton>
      </ContentContainer>
    </Container>
  );
}
