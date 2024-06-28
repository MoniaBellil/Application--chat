import { Injectable } from '@angular/core';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket$!: WebSocketSubject<any>;

  constructor() { }

  connect(url: string): WebSocketSubject<any> {
    this.socket$ = webSocket(url);
    return this.socket$;
  }

  sendMessage(message: any) {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  close() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
