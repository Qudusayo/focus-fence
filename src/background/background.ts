import { extractDomain } from "../options/functions";

function checkForBlackList(tabId, changeInfo, tab) {
  if (changeInfo && changeInfo.url) {
    // Get currentMode from storage
    chrome.storage.sync.get(["currentMode"], function (result) {
      const currentMode = result.currentMode;

      if (!currentMode) {
        return;
      }

      chrome.storage.sync.get([`${currentMode}_state`], function (result) {
        const state = result[`${currentMode}_state`];

        if (!state) {
          return;
        }

        chrome.storage.sync.get([`${currentMode}_${state}`], function (result) {
          const list = result[`${currentMode}_${state}`];

          let blockedSite = "";
          let notAllowed = false;

          if (state === "blacklist") {
            if (list && list?.length > 0) {
              // Check if current url is in blacklist
              blockedSite = list.find((site) => {
                return changeInfo.url.includes(site?.url);
              })?.url;
              notAllowed = changeInfo.url.includes(blockedSite);
              if (notAllowed) {
                updateStatistics(currentMode, blockedSite);
                fireRedirect(tabId, blockedSite, currentMode);
              }
            }
          }

          if (state === "whitelist") {
            if (list && list?.length > 0) {
              // Check if current url is in whitelist
              blockedSite = list.find((site) => {
                return changeInfo.url.includes(site?.url);
              })?.url;

              notAllowed = !changeInfo.url.includes(blockedSite);

              chrome.storage.sync.get(
                [`${currentMode}_redirect`],
                function (result) {
                  let redirectObj = result[`${currentMode}_redirect`];
                  if (redirectObj && redirectObj.active) {
                    if (changeInfo.url.includes(redirectObj.redirect)) {
                      return;
                    }
                  }
                  if (notAllowed) {
                    updateStatistics(currentMode, changeInfo.url);
                    fireRedirect(tabId, changeInfo.url, currentMode);
                  }
                }
              );
            } else {
              // If whitelist is empty, block all sites
              updateStatistics(currentMode, changeInfo.url);
              fireRedirect(tabId, changeInfo.url, currentMode);
            }
          }
        });
      });
    });
  }
}

function fireRedirect(tabId, blockedSite, currentMode) {
  chrome.storage.sync.get([`${currentMode}_redirect`], function (result) {
    let redirectObj = result[`${currentMode}_redirect`];

    const extensionURL = `chrome-extension://${chrome.runtime.id}/blocked.html?site=${blockedSite}`;
    chrome.tabs.update(tabId, { url: extensionURL });

    if (redirectObj && redirectObj.active) {
      setTimeout(
        () =>
          chrome.tabs.update(tabId, {
            url: redirectObj.redirect,
          }),
        1000
      );
      return;
    }
  });
}

function updateStatistics(mode, blockedSite) {
  const today = new Date().toLocaleDateString();
  chrome.storage.sync.get(["statistics"], function (result) {
    let statistics = result.statistics;
    if (statistics) {
      if (statistics[mode]) {
        if (statistics[mode][today]) {
          statistics[mode][today].blockedSites.push(blockedSite);
          statistics[mode][today].blockedWebsites =
            statistics[mode][today].blockedSites.length;
        } else {
          statistics[mode][today] = {
            blockedSites: [blockedSite],
            blockedWebsites: 1,
          };
        }
      } else {
        statistics[mode] = {
          [today]: {
            blockedSites: [blockedSite],
            blockedWebsites: 1,
          },
        };
      }
    } else {
      statistics = {
        [mode]: {
          [today]: {
            blockedSites: [blockedSite],
            blockedWebsites: 1,
          },
        },
      };
    }
    chrome.storage.sync.set({ statistics });
  });
}

// // Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTabInfo") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      sendResponse(currentTab);
    });
    // Return true to indicate that sendResponse will be used asynchronously
    return true;
  }
  if (request.action === "currentMode") {
    chrome.storage.sync.get(["currentMode"], function (result) {
      sendResponse(result.currentMode);
    });
    return true;
  }
});

chrome.tabs.onUpdated.addListener(checkForBlackList);

chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.tabId === chrome.tabs.TAB_ID_NONE) {
    return; // Ignore events not related to tabs
  }

  chrome.tabs.get(details.tabId, function (tab) {
    if (tab.active && details.frameId === 0) {
      // This indicates the current tab has been reloaded
      // Perform actions as needed
      console.log("Fired");
      checkForBlackList(details.tabId, { url: tab.url }, tab);
    }
  });
});

// Open tutorial page on install
chrome.runtime.onInstalled.addListener(function () {
  console.log("Installed");
  const extensionTutorialURL = `chrome-extension://${chrome.runtime.id}/options.html#/tutorial`;
  chrome.tabs.create({ url: extensionTutorialURL });
});
