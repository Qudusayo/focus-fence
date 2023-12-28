import React, { useEffect, useState } from "react";
import {
  Container,
  ContentContainer,
  ContentBlock,
  Tab,
  ControlButton,
} from "./StyledComponent";
import { FiLock } from "react-icons/fi";
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
  const [isBlockedUrl, setIsBlockedUrl] = useState(false);
  const [isChromeUrl, setIsChromeUrl] = useState(false);

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
          setIsBlockedUrl(true);
        } else {
          if (
            url.includes("chrome://") ||
            url.includes("chrome-extension://") ||
            url.includes("chrome-search://") ||
            url.includes("chrome-untrusted://") ||
            url.includes("chrome-native://") ||
            url.includes("chrome-distiller://") ||
            url.includes("chrome-error://") ||
            url.includes("chrome-newtab://")
          )
            setIsChromeUrl(true);
          baseDomain = extractBaseDomain(url);
          setIsBlockedUrl(false);
        }
        setCurrentUrl(baseDomain);

        setFaviconUrl(favIconUrl);
      }
    });

    chrome.storage.sync.get(["currentMode"], function (result) {
      if (result.currentMode) {
        let mode = result.currentMode;
        console.log(`${mode}_state`);
        setActiveTab(mode);
        chrome.storage.sync.get([`${mode}_state`], function (res) {
          console.log(res);
          if (res[`${mode}_state`]) {
            console.log(res[`${mode}_state`]);
            setStatusTab(res[`${mode}_state`] ?? "blacklist");
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    // Get the current active tab to chrome storage
    // chrome.storage.sync.set({ currentMode: activeTab }, function () {
    //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, { message: "reload_page" });
    //   });
    // });

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
  }, [statusTab]);

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
        // Check if the current url is already in the blacklist
        const isExist = blacklist.find((item) => item.url === currentUrl);
        if (isExist) {
          return;
        }

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
        setCategoryList(blacklist);
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
            setCategoryList([
              {
                url: currentUrl,
                faviconUrl: faviconUrl,
              },
            ]);
          }
        );
      }
      setIsBlockedUrl(true);
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "reload_page" });
    });
  };

  const updateActiveTab = (tab: "fun" | "work" | "study") => {
    setActiveTab(tab);
    chrome.storage.sync.set({ currentMode: tab }, function () {
      // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //   chrome.tabs.sendMessage(tabs[0].id, { message: "reload_page" });
      // });
      chrome.storage.sync.get([`${tab}_${statusTab}`], function (result) {
        const blacklist = result[`${tab}_${statusTab}`];
        setCategoryList(blacklist ?? []);
      });
    });
  };

  const updateStatusTab = (tab: "blacklist" | "whitelist") => {
    setStatusTab(tab);
    chrome.storage.sync.set({ [`${activeTab}_state`]: tab });
  };

  const editPage = () => {
    const extensionUrl = chrome.runtime.getURL("options.html");
    const queryTab = statusTab === "blacklist" ? "blacklist" : "whitelist";
    chrome.tabs.create({
      url: extensionUrl + `#/${activeTab}?mode=${queryTab}`,
    });
  };

  return (
    <Container>
      <Tab>
        <div
          className={activeTab === "fun" ? "active" : ""}
          onClick={() => updateActiveTab("fun")}
        >
          Fun
        </div>
        <div
          className={activeTab === "work" ? "active" : ""}
          onClick={() => updateActiveTab("work")}
        >
          Work
        </div>
        <div
          className={activeTab === "study" ? "active" : ""}
          onClick={() => updateActiveTab("study")}
        >
          Study
        </div>
      </Tab>
      <Tab>
        <div
          className={statusTab === "blacklist" ? "active" : ""}
          onClick={() => updateStatusTab("blacklist")}
        >
          Blacklist
        </div>
        <div
          className={statusTab === "whitelist" ? "active-white" : ""}
          onClick={() => updateStatusTab("whitelist")}
        >
          Whitelist
        </div>
      </Tab>
      {!isChromeUrl && (
        <ContentContainer
          h={"130px"}
          bg="#fff"
          p="0px"
          style={
            {
              // background: "linear-gradient(40deg, #dd0043 11.81%, #ff7c60 86.17%)",
            }
          }
          favIconUrl={faviconUrl}
          className="relative"
        >
          <div className="w-[85%] mx-auto py-2">
            <header>Visiting Now</header>
            <h2>{currentUrl}</h2>
          </div>
          {isBlockedUrl ? (
            <div className="bg-[#00000054] text-center py-5 absolute bottom-0 w-full text-base flex gap-2 items-center justify-center">
              <FiLock size={18} />
              <span className="text-white">Website blocked</span>
            </div>
          ) : (
            <ControlButton
              onClick={addToBlacklist}
              className="w-[93%] mx-auto mt-4 flex gap-2 items-center justify-center"
            >
              <FiLock size={18} />
              <span>Add this website to blacklist</span>
            </ControlButton>
          )}
          q
        </ContentContainer>
      )}

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
        <ControlButton
          whitelist={statusTab === "whitelist"}
          onClick={() => editPage()}
        >
          <PiGearSix size={15} />
          <span>
            Edit {statusTab === "blacklist" ? "Blacklist" : "Whitelist"}
          </span>
        </ControlButton>
      </ContentContainer>
    </Container>
  );
}
