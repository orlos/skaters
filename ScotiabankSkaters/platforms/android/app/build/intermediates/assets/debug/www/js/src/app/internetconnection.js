window.__ConnectionStatus = "unknown";
window.__IsConnectedToInternet = false;

document.addEventListener("offline", ic_OnOffline, false);

function ic_OnOffline() {
    // Handle the offline event
    window.__ConnectionStatus = "offline";
    window.__IsConnectedToInternet = true;
    console.log(window.__ConnectionStatus);
}

document.addEventListener("online", ic_OnOnline, false);

function ic_OnOnline() {
    // Handle the online event

    window.__ConnectionStatus = "online";
    window.__IsConnectedToInternet = false;
    console.log(window.__ConnectionStatus);
}