const WIDGET_APP_URL = 'https://www.widget-app.callercloud.freston.io'
const WIDGET_BUTTON_URL = 'https://www.widget.callercloud.freston.io'

// const WIDGET_APP_URL = 'http://localhost:3001'
// const WIDGET_BUTTON_URL = 'http://localhost:3000'

const floatingButton = document.querySelector(".floating-action-button");
let isModalOpened = false;
floatingButton.addEventListener("click", () => {
  isModalOpened = modalPopup();
});
let urlString = `${WIDGET_APP_URL}/auth/welcome/:account_id=000/:widget_id=1111`
let accId = urlString.split(':');
console.log('accId',accId);
console.log("sample", accId[3].split('=')[1])
let a = window.location
console.log('fffffff---',a);
let url = new URL(a);
console.log("url4444", url);
var accountId = url.searchParams.get("account_id");
var widgetId = url.searchParams.get("widget_id");

console.log('accountId ppppp',accountId);
console.log('widgetId ppppp',widgetId);
function modalPopup() {
  console.log("working");
  // Create the iframe element
  if (!isModalOpened) {
    console.log("ModalOpenedtrue", isModalOpened,WIDGET_APP_URL);

    var iframe = document.createElement("iframe");

    // Set the source URL of the iframe
    iframe.src = `${WIDGET_APP_URL}/auth/welcome?account_id=${accountId}&widget_id=${widgetId}`;

    // Set any additional attributes or styles for the iframe
    // iframe.width = "500";
    // iframe.height = "300";
    iframe.allow = "camera; microphone";
    iframe.setAttribute("id", "widgetPopup");
    iframe.setAttribute(
      "style",
      "border-width:0;background-color:transparent;height:inherit;position:relative;bottom:30%;overflow-y: scroll;padding-left: 15px;padding-right: 15px; width: 100%;"
    );
    let data = {
      account_id: accountId,
      widget_id: widgetId,
    };

    // Append the iframe to the desired location in the document

    document.body.appendChild(iframe);

    iframe.addEventListener("load", () => {
      iframe.contentWindow.postMessage(data, "*");
    });
    // iframe.contentWindow.postMessage(data, "*")
    return true;
  } else {
    var widgetPopup = document.getElementById("widgetPopup");
    document.body.removeChild(widgetPopup);
    return false
  }
}
