MsgElem = document.getElementById("msg")
TokenElem = document.getElementById("token")
NotisElem = document.getElementById("notis")
ErrElem = document.getElementById("err")
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyCD8zerHteGZqqsgxp6q86Ervw2gB1-0sI",
  authDomain: "firelink-8b41e.firebaseapp.com",
  databaseURL: "https://firelink-8b41e.firebaseio.com",
  projectId: "firelink-8b41e",
  storageBucket: "firelink-8b41e.appspot.com",
  messagingSenderId: "926362946477"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging
    .requestPermission()
    .then(function () {
        MsgElem.innerHTML = "Notification permission granted."
        console.log("Notification permission granted.");

        // get the token in the form of promise
        return messaging.getToken()
    })
    .then(function(token) {
        TokenElem.innerHTML = "Your Private Token: " + token
    })
    .catch(function (err) {
        ErrElem.innerHTML =  ErrElem.innerHTML + "; " + err
        console.log("Unable to get permission to notify.", err);
    });

messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    NotisElem.innerHTML = NotisElem.innerHTML + JSON.stringify(payload)
});

document.getElementById("newToken").addEventListener("click", getNewToken);

function getNewToken() {
    alert('New Token Generated!');
}
