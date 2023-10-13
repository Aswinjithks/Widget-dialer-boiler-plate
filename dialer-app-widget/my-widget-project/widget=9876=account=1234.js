var body = document.getElementsByTagName("body")[0];
    
    var iframe = document.createElement("iframe");
    
    iframe.src = "http://localhost:3000?account_id=1234&widget_id=9876";
    
    iframe.width = "100%";
    
    // iframe.height = "100%";
    iframe.allow="camera; microphone"
    iframe.setAttribute("style", "border-width:0;background-color:transparent;position:sticky;bottom:0;height:70vh;left:0;overflow: hidden;");
    
    console.log("body",body)
    
    body.appendChild(iframe);