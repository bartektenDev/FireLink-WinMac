
window.firstMsgOfSession = false;

function pageload() {
  console.log("PageLoad Function Running...");
  receivedDeviceKey();
}

function receivedDeviceKey()  {
  console.clear();
  var element =  document.getElementById('notis');
  if (typeof(element) != 'undefined' && element != null)
  {
    console.log("I think I found the element!");
    var node = document.getElementById('notis'),
    textContent = node.textContent;
    // textContent = "{"from":"926362946477","notification":{"title":"FireLink","body":"Mobile Device","icon":"https://raw.githubusercontent.com/bartektenDev/FireLink/master/images/web_hi_res_512.png","click_action":"":"dGqYgwIOgWc:APA91bH7zZJvD9cXnbd-2KRjQmOa3BhFtmlZHGGRfGj30bq-hMAPoM62BDSfjosBSDIoKv_TVQuZac7cdi9JMVM28GBSP_ZiXJ0SSkX_Kk1FrWdDesn73YnJUWKaE1RTDlCBaYCat-8Q"},"collapse_key":"do_not_collapse"}"
    if(textContent.length > 1){
      console.log("I think I just got a key! " + textContent.toString());
      var msgData = textContent.toString();
      var firstvariable1 = "click_action";
      var secondvariable1 = "},";
      var regExString1 = new RegExp("(?:"+firstvariable1+")(.*?)(?:"+secondvariable1+")", "ig");
      var storeRawData1 = msgData;
      var testRE1 = regExString1.exec(storeRawData1);

      if (testRE1 && testRE1.length > 1)
      {
        var brokenKey = testRE1[1];
        var silverKey = brokenKey.replace('":"','');
        var goldenKey = silverKey.replace('"','');
        //now lets check if the sent data is a token or not
        if(goldenKey.length == 152){
          //did we notify them?
          if(firstMsgOfSession == false){
            prompt("You received a key from a mobile device! If you choose to accept, copy the key and paste it in settings within the FireLink web extension. Then close this tab. /n Key: ", goldenKey);
            firstMsgOfSession = true;
            location.reload();
          }
        }
      }
    }
  }
  setTimeout(function(){receivedDeviceKey()}, 1000);
}
