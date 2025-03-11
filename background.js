// Ensure service worker stays alive only when needed
chrome.runtime.onInstalled.addListener(() => {
    createContextMenu();
});

// Create Context Menu
function createContextMenu() {
    chrome.contextMenus.removeAll(() => {
        chrome.storage.local.get(["links"], (data) => {
            let CMjsonLSRead = data.links ? JSON.parse(data.links) : { links: [] };
            let CMcountLinks = 0;

            if (CMjsonLSRead.links.length > 0) {
                CMjsonLSRead.links.forEach((item) => {
                    CMcountLinks++;
                    let menuTitle = item.pathUrl == 0 ? item.pathName : " - " + item.pathName;
                    chrome.contextMenus.create({
                        id: `cm_${CMcountLinks}`,
                        title: menuTitle,
                        contexts: ["all"]
                    });
                });
            } else {
                chrome.contextMenus.create({
                    id: "cm_root",
                    title: "root",
                    contexts: ["all"]
                });
            }
        });
    });
}

// Handle Context Menu Clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    goCMPath(info.menuItemId, tab);
});

function goCMPath(menuItemId, tab) {
    chrome.storage.local.get(["links"], (data) => {
        let currentPathUrl = "";
        let CMjsonLSRead = data.links ? JSON.parse(data.links) : { links: [] };

        if (CMjsonLSRead.links.length > 0) {
			const linkId = menuItemId.replace("cm_", "");
            let linkItem = CMjsonLSRead.links[linkId - 1]; // Adjust array index
            if (linkItem) {
                currentPathUrl = linkItem.pathUrl;
            }
        }

        let url = new URL(tab.url);
        let newUrl = `${url.protocol}//${url.host}${currentPathUrl}`;

        chrome.tabs.update(tab.id, { url: newUrl });
    });
}
