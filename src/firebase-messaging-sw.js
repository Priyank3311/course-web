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


// importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyB-GGHXznGiWgZO_1xafvRUjiWpa0BY-vA",
//   authDomain: "course-e8a82.firebaseapp.com",
//   projectId: "course-e8a82",
//   storageBucket: "course-e8a82.firebasestorage.app",
//   messagingSenderId: "974491916174",
//   appId: "1:974491916174:web:790aac8fc4334cb222f6df",
//   measurementId: "G-3YD308XBCE"
// });

// const messaging = firebase.messaging();
// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Background message received:', payload);

//   const notificationTitle = payload.notification?.title || 'New Message';
//   const notificationOptions = {
//     body: payload.notification?.body,
//     icon: '/assets/logo.png',
//     data: {
//       click_action: payload.notification?.click_action || '/'
//     }
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();
//   const clickAction = event.notification.data?.click_action;
//   if (clickAction) {
//     event.waitUntil(clients.openWindow(clickAction));
//   }
// });
