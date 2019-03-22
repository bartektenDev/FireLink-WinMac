MsgElem = document.getElementById("msg")
TokenElem = document.getElementById("token")
NotisElem = document.getElementById("notis")
ErrElem = document.getElementById("err")
QRTokenElem = document.getElementById("tokenImage1")
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyCD8zerHteGZqqsgxp6q86Ervw2gB1-0sI",
  authDomain: "firelink-8b41e.firebaseapp.com",
  databaseURL: "https://firelink-8b41e.firebaseio.com",
  storageBucket: "firelink-8b41e.appspot.com",
  messagingSenderId: "926362946477"
};
firebase.initializeApp(config);

const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';

const messaging = firebase.messaging();
messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // [START_EXCLUDE]
      // Display new Instance ID token and clear UI of all previous messages.
      resetUI();
      // [END_EXCLUDE]
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
  });

messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    var x = document.getElementById("notis");
    x.style.display = "none";
    NotisElem.innerHTML = NotisElem.innerHTML + JSON.stringify(payload)
});

function resetUI() {
    clearMessages();
    showToken('loading...');
    // [START get_token]
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then(function(currentToken) {
      if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
      showToken('Error retrieving Instance ID token. ', err);
      setTokenSentToServer(false);
    });
    // [END get_token]
  }

function showToken(currentToken) {
  // Show token in console and UI.
  var tokenElement = document.querySelector('#token');
  tokenElement.textContent = currentToken;
  //if the currentToken text is the exact length as a typical token then change the QR Code Image to this token
  if(currentToken.length == 152){
    document.getElementById("tokenImage1").src = 'https://api.qrserver.com/v1/create-qr-code/?data=' + currentToken + '&amp;size=150x150';
  }else{
    document.getElementById("tokenImage1").src = 'https://api.qrserver.com/v1/create-qr-code/?data=NOTOKEN&amp;size=150x150';
  }
}

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
      console.log('Sending token to server...');
      // TODO(developer): Send the current token to your server.
      setTokenSentToServer(true);
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
          'unless it changes');
    }
  }

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') === '1';
}
function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

function showHideDiv(divId, show) {
    const div = document.querySelector('#' + divId);
    if (show) {
      div.style = 'display: visible';
    } else {
      div.style = 'display: none';
    }
  }

function requestPermission() {
    console.log('Requesting permission...');
    // [START request_permission]
    messaging.requestPermission().then(function() {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // [START_EXCLUDE]
      // In many cases once an app has been granted notification permission, it
      // should update its UI reflecting this.
      resetUI();
      // [END_EXCLUDE]
    }).catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
    // [END request_permission]
  }

function deleteToken() {
    // Delete Instance ID token.
    // [START delete_token]
    messaging.getToken().then(function(currentToken) {
      messaging.deleteToken(currentToken).then(function() {
        var token = document.getElementById("token").innerHTML;
        document.getElementById("tokenImage1").src = 'https://api.qrserver.com/v1/create-qr-code/?data=NOTOKEN&amp;size=150x150';
        console.log('Token deleted.');
        setTokenSentToServer(false);
        // [START_EXCLUDE]
        // Once token is deleted update UI.
        resetUI();
        // [END_EXCLUDE]
      }).catch(function(err) {
        console.log('Unable to delete token. ', err);
      });
      // [END delete_token]
    }).catch(function(err) {
      console.log('Error retrieving Instance ID token. ', err);
      showToken('Error retrieving Instance ID token. ', err);
    });
  }

// Add a message to the messages element.
function appendMessage(payload) {
  const messagesElement = document.querySelector('#messages');
  const dataHeaderELement = document.createElement('h5');
  const dataElement = document.createElement('pre');
  dataElement.style = 'overflow-x:hidden;';
  dataHeaderELement.textContent = 'Received message:';
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderELement);
  messagesElement.appendChild(dataElement);
  var x = document.getElementById("notis");
  x.style.display = "none";
}
// Clear the messages element of all children.
function clearMessages() {
  const messagesElement = document.querySelector('#messages');
  while (messagesElement.hasChildNodes()) {
    messagesElement.removeChild(messagesElement.lastChild);
  }
}
function updateUIForPushEnabled(currentToken) {
  showHideDiv(tokenDivId, true);
  showHideDiv(permissionDivId, false);
  showToken(currentToken);
}
function updateUIForPushPermissionRequired() {
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
}
resetUI();
