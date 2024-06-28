import { Component, OnDestroy  } from '@angular/core';

import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnDestroy {
  messages: string[] = [];
  messageText: string = '';
  connectedUsers: string[] = [];
  messageSentConfirmation: string = '';


  constructor(private websocketService: WebsocketService) {
    this.websocketService.connect('ws://localhost:3000').subscribe(
      (message) => {
        this.messages.push(message);
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );
  }

  sendMessage() {
    if (this.messageText.trim() !== '') {
      this.websocketService.sendMessage(this.messageText);
      this.messages.push(this.messageText);
      this.messageText = '';
    }
    this.messageSentConfirmation = 'Message envoyé avec succès'; 
    setTimeout(() => {
      this.messageSentConfirmation = ''; 
    }, 3000); 
  }

  ngOnDestroy(): void {
    this.websocketService.close();
  }

}
