const YOUTUBE_RULE_ID = 1;

function checkTimeAndUpdateRule() {
  const hours = new Date().getHours();
  
  // 22 is 10 PM, 7 is 7 AM. 
  // Block if the hour is 22 or 23, OR if it is between 0 and 6.
  const shouldBlock = hours >= 22 || hours < 7;

  if (shouldBlock) {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [{
        id: YOUTUBE_RULE_ID,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "||youtube.com",
          resourceTypes: ["main_frame"]
        }
      }],
      removeRuleIds: [YOUTUBE_RULE_ID] // Remove first to prevent duplicate ID errors
    });
  } else {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [YOUTUBE_RULE_ID]
    });
  }
}

// Check the time when the browser starts
chrome.runtime.onStartup.addListener(checkTimeAndUpdateRule);

// Check on initial install, and set the repeating 1-minute alarm
chrome.runtime.onInstalled.addListener(() => {
  checkTimeAndUpdateRule();
  chrome.alarms.create("checkTimeAlarm", { periodInMinutes: 1 });
});

// Listen for the alarm to trigger the time check
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkTimeAlarm") {
    checkTimeAndUpdateRule();
  }
});