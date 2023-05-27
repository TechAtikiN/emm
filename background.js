chrome.runtime.onInstalled.addListener(function () {
  chrome.action.setBadgeText({ text: "ACTIVE" });

  chrome.notifications.create({
    type: 'basic',
    title: 'Extension Activated',
    message: 'Your extension is now active.',
    iconUrl: 'images/icon-32.png'
  });
});
