
function pageload() {
  //grab whatever value we have in the textbox
  var token = document.getElementById("token").innerHTML;
  document.getElementById("tokenImage1").src = 'https://api.qrserver.com/v1/create-qr-code/?data=' + token + '&amp;size=150x150';
}
