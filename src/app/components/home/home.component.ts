import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, MatCardModule, MatProgressBarModule, MatButtonModule, MatDividerModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  title = 'ChatAppClient';
  private connection: HubConnection;
  private hubUrl: string = "https://localhost:5001";
  public messages: string[] = [];
  public peripheral: string = "";
  public command: string = "";
  public jsonInput: string = "";

  constructor(private http: HttpClient) {
    this.connection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/hub?username=Tela' + Math.floor(Math.random() * 100))
      .build();
  }

  async ngOnInit() {
    this.connection.on('ReceberRetorno', (message) => {
      this.messages.push(`${message}`);
    });

    try {
      await this.connection.start();
      console.log('Connected to SignalR hub');
      this.onLoad();

    } catch (error) {
      console.error('Failed to connect to SignalR hub', error);
    }
  }

  async onLoad() {

  }

  async sendMessage() {
    if (!this.command) return;
    await this.connection.invoke('EnviarComandoParaPeriferico', this.command, this.peripheral, this.jsonInput);
  }
}
