chrome.runtime.sendMessage("I am loading content script", (response) => {
  console.log(response);
  console.log("I am content script");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "reload_page") {
    location.reload();
  }
});

window.onload = (event) => {
  console.log("page is fully loaded");
};
