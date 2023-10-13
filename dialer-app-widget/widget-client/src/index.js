import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import department from '../../widget-client/src/pages/department/useDepartment'

window.addEventListener('message',  (event) => {

  if(event.data.account_id){
    let account_id =  event.data.account_id;
    let widget_id = event.data.widget_id;
    localStorage.setItem("account_id",account_id);
    console.log("account id from iframe ",account_id,widget_id );
  }
  // let account_id =  event.data.account_id;
  // let widget_id = event.data.widget_id;
  // console.log("account id from iframe ",account_id,widget_id );
  
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

