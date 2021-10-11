function goToHTMLFile(path) {
    chrome.storage.local.set({"popupPage": path});
}
