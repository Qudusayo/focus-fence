import { extractDomain } from "../options/functions";

chrome.runtime.sendMessage("I am loading content script", (response) => {
  console.log(response);
  console.log("I am content script");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "reload_page") {
    location.reload();
  }
});

const updateVisitedSites = (mode, url, faviconUrl) => {
  // check if url chrome-extension:// or chrome:// or about:// or file://
  if (
    url.includes("chrome-extension://") ||
    url.includes("chrome://") ||
    url.includes("about://") ||
    url.includes("file://")
  )
    return;
  url = extractDomain(url);
  chrome.storage.sync.get([`${mode}_visitedSites`], function (result) {
    let visitedSites = result[`${mode}_visitedSites`];
    if (visitedSites) {
      if (visitedSites[url]) {
        visitedSites[url].count++;
      } else {
        visitedSites[url] = {
          count: 1,
          faviconUrl,
        };
      }
    } else {
      visitedSites = {
        [url]: {
          count: 1,
          faviconUrl,
        },
      };
    }
    chrome.storage.sync.set({ [`${mode}_visitedSites`]: visitedSites });
  });
};

window.onload = (event) => {
  console.log("page is fully loaded");
  // Update visitedSites
  chrome.runtime.sendMessage({ action: "currentMode" }, function (result) {
    const currentMode = result;
    chrome.runtime.sendMessage({ action: "getTabInfo" }, (tab) => {
      if (currentMode) {
        console.log(currentMode, tab.url, tab.favIconUrl);
        updateVisitedSites(currentMode, tab.url, tab.favIconUrl);
      }
    });
  });
};
