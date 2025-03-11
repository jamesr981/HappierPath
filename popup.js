document.addEventListener("DOMContentLoaded", function () {
    setUp(); // Populate variables
    jsonReader(1); // Populate selector with current links list
    // Event listeners for buttons and links
    document.getElementById("pathGo").addEventListener("click", () => goPath(0, 0));
    document.getElementById("openEditor").addEventListener("click", () => toggleEditor(true));
    document.getElementById("closeEditor").addEventListener("click", () => toggleEditor(false));
    document.getElementById("showPageInfo").addEventListener("click", () => toggleInfo(true));
    document.getElementById("hidePageInfo").addEventListener("click", () => toggleInfo(false));
    document.getElementById("jsonRead").addEventListener("click", () => jsonReader(0));
    document.getElementById("jsonWrite").addEventListener("click", jsonWriter);
    document.getElementById("donateButton").addEventListener("click", () => buyMeABeer());
    document.getElementById("githubButton").addEventListener("click", () => github());
	document.getElementById("closeButton").addEventListener("click", () => window.close());
});

function buyMeABeer() {
    chrome.tabs.create({ url: "https://www.buymeacoffee.com/jreynolds" });
}

function github() {
    chrome.tabs.create({ url: "https://github.com/jamesr981/HappierPath" });
}

function setUp() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tab = tabs[0];
        let url = new URL(tab.url);

        document.getElementById("protocol").textContent = url.protocol.replace(":", "");
        document.getElementById("protocolSelector").value = url.protocol + "//";
        document.getElementById("host").textContent = url.hostname;
        document.getElementById("port").textContent = url.port;
        document.getElementById("path").textContent = url.pathname;
        document.getElementById("query").textContent = url.search;
        document.getElementById("currentDomain").value = url.hostname;
    });
}

function goPath(linkId, newTab) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tab = tabs[0];
        let url = new URL(tab.url);
        let urlProtocol = document.getElementById("protocolSelector").value;
        let urlHost = document.getElementById("currentDomain").value;
        let newUrl = urlProtocol + urlHost;

        newUrl += linkId === 0 ? url.pathname : linkId;

        if (newTab === 1) {
            chrome.tabs.create({ url: newUrl });
        } else {
            chrome.tabs.update(tab.id, { url: newUrl });
        }
        setUp();
    });
}

function jsonReader(countSetting) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0];
        let currentUrl = new URL(currentTab.url);
        let currentUrlPath = currentUrl.pathname;
        let selectLinks = "<h2>Select your path:</h2><ul>";
        let stringLinks = ""; // Store link data for jsonIO textarea
        let countLinks = 0;

        // Fetch saved links from chrome.storage
        chrome.storage.local.get(["links"], function (data) {
            let storedLinks = data.links ? JSON.parse(data.links) : { links: [] };

            if (storedLinks.links.length > 0) {
                storedLinks.links.forEach((link) => {
                    countLinks++;
                    let currentPathName = link.pathName;
                    let currentPathUrl = link.pathUrl;
                    stringLinks += `${currentPathName}>${currentPathUrl}\n`;

                    // Handle regex-based transformations
                    if (currentPathUrl.includes("<<<")) {
                        let [regexPattern, replacePattern] = currentPathUrl.split("<<<");
                        let regex = new RegExp(regexPattern, "gi");

                        if (currentUrlPath.match(regex)) {
                            let newPath = currentUrlPath.replace(regex, replacePattern);
                            selectLinks += `
                                <li>
                                    <a href="#" class="sameTabLink" data-url="${newPath}">${currentPathName}</a>
                                    <a href="#" class="newTabLink" data-url="${newPath}">+tab</a>
                                </li>
                            `;
                        }
                    }
                    // Handle title-only entries
                    else if (currentPathUrl == 0) {
                        selectLinks += `<li class="listTitle">${currentPathName}</li>`;
                    }
                    // Handle standard paths
                    else {
                        selectLinks += `
                            <li>
                                <a href="#" class="sameTabLink" data-url="${currentPathUrl}">${currentPathName}</a>
                                <a href="#" class="newTabLink" data-url="${currentPathUrl}">+tab</a>
                            </li>
                        `;
                    }
                });

                // Remove trailing newline character from stringLinks
                stringLinks = stringLinks.trim();
            } else {
                selectLinks = `<li><a href="#" class="sameTabLink" data-url="/">/</a></li>`;
                stringLinks = "/>/";
            }

            selectLinks += "</ul>";
            document.getElementById("pathList").innerHTML = selectLinks;
            document.getElementById("jsonIO").value = stringLinks;

            // Attach event listener using event delegation
            document.getElementById("pathList").addEventListener("click", function (event) {
                if (event.target.classList.contains("sameTabLink")) {
                    event.preventDefault();
                    goPath(event.target.getAttribute("data-url"), 0);
                } else if (event.target.classList.contains("newTabLink")) {
                    event.preventDefault();
                    goPath(event.target.getAttribute("data-url"), 1);
                }
            });
        });
    });
}


function jsonWriter() {
    let inputData = document.getElementById("jsonIO").value.trim();
    if (inputData) {
        let lines = inputData.split("\n");
        let jsonPaths = { links: [] };

        lines.forEach((line) => {
            let [pathName, pathUrl] = line.split(">");
            if (pathName && pathUrl) {
                jsonPaths.links.push({ pathName, pathUrl });
            }
        });

        chrome.storage.local.set({ links: JSON.stringify(jsonPaths) }, function () {
            jsonReader();
        });
    }
}

function toggleEditor(show) {
    document.getElementById("editPaths").style.display = show ? "block" : "none";
    document.getElementById("showPaths").style.display = show ? "none" : "inline";
    document.getElementById("hidePaths").style.display = show ? "inline" : "none";
}

function toggleInfo(show) {
    document.getElementById("info").style.display = show ? "block" : "none";
    document.getElementById("showInfo").style.display = show ? "none" : "inline";
    document.getElementById("hideInfo").style.display = show ? "inline" : "none";
}