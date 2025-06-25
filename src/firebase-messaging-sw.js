importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

let firebaseConfig;

self.addEventListener('message', (event) => {
  if (event.data && event.data.firebaseConfig) {
    firebaseConfig = event.data.firebaseConfig;
    initializeFirebaseApp();
  }
});

function initializeFirebaseApp() {
  if (!firebaseConfig) return;

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
}

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const clickAction = event.notification.data?.click_action;
  if (clickAction) {
    event.waitUntil(
      clients.openWindow(clickAction)
    );
  }
});

if ('permissions' in navigator) {
  navigator.permissions.query({ name: 'notifications' }).then(function (notificationPerm) {
    notificationPerm.onchange = function () {
      setTimeout(() => {
        self.clients.matchAll().then(function (clients) {
          clients.forEach(function (client) {
            client.postMessage({
              type: 'NOTIFICATION_PERMISSION_CHANGED',
              permission: notificationPerm.state
            });
          });
        });
      }, 1000);
    };
  });
}
