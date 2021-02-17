let CSS = "/app/dark-style.css";
let SERIF_CSS = "/app/added_styles/serif.css";

/* map to store all of the styles and a boolean indicating if it should be shown */
const STYLES = new Map();
STYLES.set(CSS, true);
STYLES.set(SERIF_CSS, true);




const TITLE_APPLY = "Apply CSS";
const TITLE_REMOVE = "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

/*
Toggle CSS: based on the current title, insert or remove the CSS.
Update the page action's title and icon to reflect its state.
*/
function toggleCSS(tab) {

    console.log(tab)

    function gotTitle(title) {
        console.log(title)

        if (title === TITLE_APPLY) {
            browser.pageAction.setIcon({ tabId: tab.id, path: "icons/on.svg" });
            browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_REMOVE });
            // browser.tabs.insertCSS({ file: CSS });

            /* we iterate over the styles and insert each style that is true */
            for (const k of STYLES.keys()) {
                if (STYLES.get(k)) {
                    browser.tabs.insertCSS({ file: k });
                }
            }
        } else {
            browser.pageAction.setIcon({ tabId: tab.id, path: "icons/off.svg" });
            browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_APPLY });
            // browser.tabs.removeCSS({ file: CSS });

            /* we iterate over the styles and remove each style that is true */
            for (const k of STYLES.keys()) {
                if (STYLES.get(k)) {
                    browser.tabs.removeCSS({ file: k });
                }
            }
        }
    }

    var gettingTitle = browser.pageAction.getTitle({ tabId: tab.id });
    gettingTitle.then(gotTitle);
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
    var anchor = document.createElement('a');
    anchor.href = url;
    return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
    if (protocolIsApplicable(tab.url)) {
        browser.pageAction.setIcon({ tabId: tab.id, path: "icons/off.svg" });
        browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_APPLY });
        browser.pageAction.show(tab.id);
        if (tab.url.includes("eclass")) {
            toggleCSS(tab)
        }
    }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
    for (let tab of tabs) {
        initializePageAction(tab);
    }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    initializePageAction(tab);
});


/*
Toggle CSS when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(toggleCSS);



//  Context menu

browser.contextMenus.create({
    id: "dark_mode",
    title: "Toggle e-class enhancer",
    contexts: ["all"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "dark_mode") {
        console.log("Changing style")
        CSS = "/app/dark-style.css"
        toggleCSS(tab)
    }
});


// /* the behavior of the settings page */
// $(document).ready(function() {

//     /* dark mode */
//     $('#dark').click(function() {
//         var crnt_val = STYLES.get(CSS);

//         /* set it the negation of its current value */
//         STYLES.set(CSS, !crnt_val);

//         /* reloads the page */
//         location.reload();
//     });


//     /* serif fonts */
//     $('#serif').click(function() {
//         var crnt_val = STYLES.get(SERIF_CSS);

//         /* set it the negation of its current value */
//         STYLES.set(SERIF_CSS, !crnt_val);

//         /* reloads the page */
//         location.reload();

//     });

// });