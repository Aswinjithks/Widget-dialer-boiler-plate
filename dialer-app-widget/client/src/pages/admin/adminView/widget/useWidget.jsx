import React from "react";
import { useSelector } from "react-redux";

const useWidget = () => {
  const { user } = useSelector((store) => store.user);

  let widget_id;
  let account_id;

  const code = `<script>
    var body = document.getElementsByTagName("body")[0];
    var iframe = document.createElement("iframe");
    iframe.id="my-widget-project-iframe-id"
    iframe.src = "https://www.widget.callercloud.freston.io?account_id=${user.userId}&widget_id=${user.peerId}";
    iframe.width = "100%";
    iframe.height = "727px";
    iframe.scrolling="no";
    iframe.setAttribute("style", "border-width:0;background-color:transparent;position:sticky;bottom:0;left:0;overflow:hidden;z-index:99999;");
    iframe.allow="camera; microphone"
    console.log("body",body)
    body.appendChild(iframe);
  </script>`;

  return { code, user };
};

export default useWidget;
