chrome.runtime.onInstalled.addListener(function() {
    
    
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === "local") {
        if ("popupPage" in changes.keys()) {
            console.log(changes);
            chrome.action.setPopup(chrome.storage.local.get("popupPage"))
        }
    }
});
