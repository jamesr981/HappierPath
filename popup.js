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
});

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

        if (linkId === 0) {
            newUrl += url.pathname;
        } else {
            let linkElement = document.getElementById(`link-${linkId}`);
            if (linkElement) {
                newUrl += linkElement.getAttribute("rel");
            }
        }

        if (newTab === 1) {
            chrome.tabs.create({ url: newUrl });
        } else {
            chrome.tabs.update(tab.id, { url: newUrl });
        }
        setUp();
    });
}

function jsonReader() {
    chrome.storage.local.get(["links"], function (data) {
        let selectLinks = "<h2>Select your path:</h2><ul>";
        let CMjsonLSRead = data.links ? JSON.parse(data.links) : { links: [] };

        CMjsonLSRead.links.forEach((link, index) => {
            let linkHtml = `<li><a href="#" id="link-${index+1}" data-id="${index}" rel="${link.pathUrl}" class="sameTabLink">${link.pathName}</a></li>`;
            selectLinks += linkHtml;
        });

        selectLinks += "</ul>";
        document.getElementById("pathList").innerHTML = selectLinks;

        // Attach event listener using event delegation
		let countLinks = 0;
        document.getElementById("pathList").addEventListener("click", function (event) {
            if (event.target.classList.contains("sameTabLink")) {
                event.preventDefault();
                let pathUrl = event.target.getAttribute("rel");
                goPath(countLinks++, 0); // Open in the same tab
            }
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
