import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  imports: [CommonModule,FormsModule]
})
export class ChatWidgetComponent {
  isOpen = false;
  prompt = '';
  messages: { sender: 'user' | 'bot', text: string }[] = [];

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.prompt.trim()) return;

    this.messages.push({ sender: 'user', text: this.prompt });

    this.http.post(
      `${environment.baseURL}/chat/ask`,
      { prompt: this.prompt }, // ✅ match backend model
      {
        responseType: 'text' as 'json' // 👈 tell Angular it's plain text
      }
    ).subscribe({
      next: (reply: any) => {
        this.messages.push({ sender: 'bot', text: reply });
        this.prompt = '';
      },
      error: err => {
        this.messages.push({ sender: 'bot', text: 'Error sending message.' });
      }
    });
  }


}
