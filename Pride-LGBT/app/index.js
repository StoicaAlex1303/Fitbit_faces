import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { me as appbit  } from "appbit";
import { display } from "display";
import userActivity from "user-activity"; 
import * as kpay from './kpay/release/kpay.js';
import * as kpay_common from '../common/kpay/kpay_common.js';
import './kpay/release/kpay_filetransfer.js';
import './kpay/release/kpay_dialogs.js';			
import './kpay/release/kpay_time_trial.js';	


//heartRate
let hBpm = document.getElementById("heartRate");
let hBpmR = document.getElementById("heartRateLabel");
let hrm = null; 
let body = null;
hrm = (hrm == null) ? new HeartRateSensor() : hrm; 
body= (body == null)? new BodyPresenceSensor():body;



//heartRate
if (appbit.permissions.granted("access_heart_rate")) 
{
  if(BodyPresenceSensor && HeartRateSensor)
  {
    hrm = new HeartRateSensor();
    display.addEventListener("change", () => 
    {
      if(display.on){
        hrm.start();
        
      }else
      {
        hrm.stop();  
      }
    });
    body = new BodyPresenceSensor();  
    body.addEventListener("reading", () => 
    {
      if(!body.present)
      {
        hBpmR.text = "--";
        hrm.stop();
      }
      else
      {
        hrm.start();      
      }
    });
    body.start();
    hrm.start();
  }  
} 
hrm.onreading = function(){
  hBpmR.text = hrm.heartRate;
}

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
//date
let date = document.getElementById("date");
let dateShadow=document.getElementById("dateShadow");
let day = document.getElementById("day");
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//Steps

clock.granularity = "seconds";
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let clockShadow = document.getElementById("clockShadow");
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = util.zeroPad(hours % 12 || 12);
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
 
  date.text = month[today.getMonth()];
  day.text = util.zeroPad(today.getDate());
  let batteryLabel= document.getElementById("battery");
  batteryLabel.text = battery.chargeLevel ;

  
  const stepsHandle = document.getElementById("steps");
  let stepsValue = (userActivity.today.adjusted["steps"] || 0);
  let stepsString = stepsValue ; 
  stepsHandle.text = stepsString;
  
  let cals = document.getElementById("txtCals"); 
  cals.text = userActivity.today.adjusted.calories; 
  userActivity.today.adjusted.steps 

 
}


//initialize
kpay.initialize();

