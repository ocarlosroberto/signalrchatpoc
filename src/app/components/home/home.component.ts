import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  title = 'ChatAppClient';
  private connection: HubConnection;
  public messages: string[] = [];
  public user: string = "";
  public message: string = "";
  public hostname: string = "";

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://172.200.170.176/SignalR.Chat.Server/chat?username=Tela' + Math.floor(Math.random() * 100))
      .build();
  }

  async ngOnInit() {
    this.connection.on('ReceiveBroadcastMessage', (userId, message) => {
      this.messages.push(`${userId}: ${message}`);
    });

    try {
      await this.connection.start();
      console.log('Connected to SignalR hub');
    } catch (error) {
      console.error('Failed to connect to SignalR hub', error);
    }

    this.hostname = location.hostname;
  }

  async sendMessage() {
    if (!this.message) return;
    await this.connection.invoke('BroadcastMessage', this.message);
    this.message = '';
  }
}
