import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../app/shared/modules/form-control/components/loader/loader.component'
import { environment } from '../environments/environment';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSelectModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'course-web';
  constructor(private router: Router, private http: HttpClient,private authService: AuthService) {
    console.log('Router Config:', this.router.config);
  }
  async ngOnInit(): Promise<void> {
    await this.registerServiceWorker();
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      let registration = await navigator.serviceWorker.getRegistration(environment.serviceWorkerPath);

      if (!registration) {
        registration = await navigator.serviceWorker.register(environment.serviceWorkerPath, {
          scope: environment.firebaseScope
        });
      } else {
        registration.navigationPreload?.enable();
        await registration.update();
      }

      if (registration.active) {
        registration.active.postMessage({
          firebaseConfig: environment.firebase,
          vapidKey: environment.vapidKey
        });
      }

      const firebaseApp = initializeApp(environment.firebase);
      const messaging = getMessaging(firebaseApp);
      onMessage(messaging, (payload) => {
        console.log('📥 Foreground message received:', payload);


        new Notification(payload.notification?.title ?? 'Default Title', {
          body: payload.notification?.body ?? 'Default Body',
          icon: '/assets/logo.png'
        });
      });

      try {
        const token = await getToken(messaging, {
          vapidKey: environment.vapidKey,
          serviceWorkerRegistration: registration
        });

        if (token) {
          console.log('Device Token:', token);
          const decodedToken = this.authService.decodeToken();
          console.log('Decoded Token:', decodedToken);
          const userId = decodedToken?.user_id;

          this.http.post('http://localhost:5070/api/auth/device-token', {
            UserId: userId,
            Token: token
          }).subscribe({
            next: res => console.log('Token saved to backend'),
            error: err => console.error('Token save failed', err)
          });
        }
      } catch (err) {
        console.error('Error getting device token:', err);
      }

      // Listen to messages while app is in foreground
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'NOTIFICATION_PERMISSION_CHANGED') {
          console.log('Notification permission changed:', event.data.permission);
          // Optionally update token here
        }
      });
    }
  }
}
