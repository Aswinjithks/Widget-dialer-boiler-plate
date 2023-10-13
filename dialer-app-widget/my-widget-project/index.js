const express = require("express");
const app = express();
var fs = require("fs");
var cors = require("cors");

app.use(
  cors({
    "Access-Controll-Allow-Origin": `${process.env.WIDGET_APP_URL}`,
  })
);

// Serve static files
app.use(express.static("public"));

app.get("/user", (req, res) => {
  let accountId = req.query.account_id;
  let widgetId = req.query.widget_id;
  let fileName = `script.js`;
  console.log("widgetid", widgetId);
  console.log(process.env.WIDGET_BUTTON_URL);
  // document.postMessage('accountId ${accountId}',"*")
  fs.appendFile(
    fileName,
    `var body = document.getElementsByTagName("body")[0];
    
    var iframe = document.createElement("iframe");
   
    iframe.id="my-widget-project-iframe-id"
    iframe.src = "${process.env.WIDGET_BUTTON_URL}/?account_id=${accountId}&widget_id=${widgetId}";
    
    iframe.width = "100%";
    
    iframe.height = "727px";
    iframe.scrolling="no";
    iframe.setAttribute("style", "border-width:0;background-color:transparent;position:sticky;bottom:0;left:0;overflow:hidden;z-index:99999;");
    iframe.allow="camera; microphone"
    
    console.log("body",body)

    
    body.appendChild(iframe);`,
    function (err, file) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
  console.log("accountId", accountId);
  console.log("__dirname", __dirname);
  const options = {
    root: `${__dirname}`,
    // headers: {
    //   'Content-Type': 'text/javascript'
    // }
  };
  res.setHeader("Content-Type", "application/javascript");
  // res.type('text/javascript').sendFile(fileName, options, function (err) {
  // res.type('.js').sendFile(fileName, options, function (err,) {
  //   if (err) {
  //     fs.unlinkSync(fileName);
  //     throw err

  //   } else {
  //     console.log('Sent:', fileName);
  //     fs.unlinkSync(fileName);
  //   }
  // });
  fs.readFile(fileName, "utf8", (err, data) => {
    console.log("data", data);
    if (err) {
      fs.unlinkSync(fileName);
      console.log(err);
      res.end();
    } else {
      res.write(data);
      fs.unlinkSync(fileName);
      res.end();
    }
  });
});
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
