

function pageload() {
  console.log("PageLoad Function Running...");
  //receivedDeviceKey();
}

function receivedDeviceKey()  {
  var gotKey = 0;
  while(gotKey<1){
    var element =  document.getElementById('notis');
    if (typeof(element) != 'undefined' && element != null)
    {
      if(element.length >= 1){
        gotKey++;
        console.log("I think I just got a key!");
      }
    }
  }
}
