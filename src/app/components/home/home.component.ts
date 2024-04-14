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
  private hubUrl: string = "http://localhost:5000";
  public messages: string[] = [];
  public user: string = "";
  public message: string = "";
  public hostname: string = "";

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/pochub?username=Tela' + Math.floor(Math.random() * 100))
      .build();
  }

  async ngOnInit() {
    this.connection.on('ReceiveBroadcastMessage', (hostName, userId, message) => {
      this.messages.push(`${hostName} - ${userId}: ${message}`);
    });

    this.connection.on('ReturnHostName', (hostname) => {
      this.hostname = hostname;
    })

    try {
      await this.connection.start();
      console.log('Connected to SignalR hub');
      this.onLoad();

    } catch (error) {
      console.error('Failed to connect to SignalR hub', error);
    }

    this.hostname = location.hostname;
  }

  async onLoad(){
    await this.connection.invoke('GetHostName');
  }

  async sendMessage() {
    if (!this.message) return;
    await this.connection.invoke('BroadcastMessage', this.message);
    this.message = '';
  }
}
