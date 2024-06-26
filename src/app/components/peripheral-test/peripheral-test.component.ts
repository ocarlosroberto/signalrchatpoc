import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-peripheral-test',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatProgressBarModule, MatButtonModule, MatDividerModule, MatInputModule, MatSelectModule],
  templateUrl: './peripheral-test.component.html',
  styleUrl: './peripheral-test.component.scss'
})
export class PeripheralTestComponent {
  title = 'Peripheral Test';
  private connection: HubConnection;
  private hubUrl: string = "http://localhost:19877";
  public messages: string[] = [];
  public peripheral: string = "";
  public command: string = "";
  public jsonInput: string = "";
  public returnPeripheral: string = "";
  public peripherals: any[] = [];
  public commands: any[] = [];

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/hub?username=Tela' + Math.floor(Math.random() * 100), {withCredentials: false})
      .build();
  }

  async ngOnInit() {
    this.connection.on('ReceberRetorno', (guid, message) => {
      this.returnPeripheral = guid + ' ' + message;
    });

    try {
      this.getPeripherals();

      await this.connection.start();
      console.log('Connected to SignalR hub');
    } catch (error) {
      console.error('Failed to connect to SignalR hub', error);
    }
  }

  async sendMessage() {
    if (!this.command) return;
    await this.connection.invoke('EnviarComandoParaPeriferico', this.generateGuid() ,this.peripheral, this.command, this.jsonInput);
  }

  getPeripherals(): void {
    const value = "perifericos";
    const storageValue = localStorage.getItem(value);
    if (storageValue)
      this.peripherals = JSON.parse(storageValue);
  }

  getCommands(): void {
    const value = this.peripheral.toLowerCase() + "-comandos";
    const storageValue = localStorage.getItem(value);

    if (storageValue)
      this.commands = JSON.parse(storageValue);
  }

  private generateGuid() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
