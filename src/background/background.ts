const blockedSites = ["qudusayo.me", "facebook.com"];

const extractBaseDomain = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
};

function checkForBlackList(tabId, changeInfo, tab) {
  if (changeInfo && changeInfo.url) {
    // Get currentMode from storage
    chrome.storage.sync.get(["currentMode"], function (result) {
      const currentMode = result.currentMode;

      // Get elemnets of [activeTab + "_blacklist"] from storage
      chrome.storage.sync.get([`${currentMode}_blacklist`], function (result) {
        const blacklist = result[`${currentMode}_blacklist`];
        if (blacklist && blacklist?.length > 0) {
          const blockedSite = blacklist.find((site) => {
            return changeInfo.url.includes(site?.url);
          })?.url;

          if (changeInfo.url.includes(blockedSite)) {
            chrome.storage.sync.get(
              [`${currentMode}_redirect`],
              function (result) {
                let redirectObj = result[`${currentMode}_redirect`];

                const extensionURL = `chrome-extension://${chrome.runtime.id}/blocked.html?site=${blockedSite}`;
                chrome.tabs.update(tabId, { url: extensionURL });

                if (redirectObj && redirectObj.active) {
                  setTimeout(
                    () =>
                      chrome.tabs.update(tabId, { url: redirectObj.redirect }),
                    1000
                  );
                  return;
                }
              }
            );
          }
        }
      });
    });
  }
}

chrome.tabs.onUpdated.addListener(checkForBlackList);

chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.tabId === chrome.tabs.TAB_ID_NONE) {
    return; // Ignore events not related to tabs
  }

  chrome.tabs.get(details.tabId, function (tab) {
    if (tab.active && details.frameId === 0) {
      // This indicates the current tab has been reloaded
      console.log("Current tab reloaded!");
      // Perform actions as needed
      checkForBlackList(details.tabId, { url: tab.url }, tab);
    }
  });
});
chrome.runtime.onInstalled.addListener(function () {
  const extensionTutorialURL = `chrome-extension://${chrome.runtime.id}/options.html#/tutorial`;
  chrome.tabs.create({ url: extensionTutorialURL });
});
