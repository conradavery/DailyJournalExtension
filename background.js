// Always set the alarm on service worker start (or onInstalled)
chrome.alarms.create("updateBadge", { periodInMinutes: 1 });

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("updateBadge", { periodInMinutes: 1 });
    changeBadge();
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "updateBadge") {
        changeBadge();
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateText') {
        chrome.storage.local.set({ dailyText: message.text }, () => {
            changeBadge();
        });
    }
});

function changeBadge() {
    const now = new Date();

    chrome.storage.local.get("dailyText", (data) => {
        const savedText = data.dailyText || "";

        // Broader condition or debug log to test
        if (savedText.trim() === '') {
            let hours = now.getHours();
            chrome.action.setBadgeText({ text: "✗"});
            if(hours>=22){
                chrome.action.setBadgeBackgroundColor({ color: "#ff3f3f" });
            }
            else if(hours>=18){
                chrome.action.setBadgeBackgroundColor({color: "#FFFF00"})
            }
            else{
                chrome.action.setBadgeText({text: ""});
            }
            }
        else {
            chrome.action.setBadgeText({ text: "✓" });
            chrome.action.setBadgeBackgroundColor({color: "#16cb00"})
        }
    });
}
