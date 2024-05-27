import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) {}

  show(message: string, severity: 'success' | 'info' | 'warn' | 'error' | 'contrast' | 'secondary', detail: string) {
    console.log("MEsssaggginn")
    this.messageService.add({ severity, summary: message, detail: detail });
  }
}
