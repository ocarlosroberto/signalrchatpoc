import { FormsModule } from '@angular/forms';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe o CommonModule

@Component({
  selector: 'app-local-storage-manager',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './local-storage-manager.component.html',
  styleUrl: './local-storage-manager.component.scss'
})
export class LocalStorageManagerComponent {
  public user: string = "";
  public key: string = "";
  public value: string = "";
  public selectedValue: string | null = null; // Inicialize com um valor padrão ou null
  items: any[] = []; // Inicialize com um array vazio
  selectedKey: string = "";

  constructor() {
    const storedItems = localStorage.getItem(this.selectedKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  ngOnInit(): void { }
  // Criar um item no LocalStorage
  createItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  // Ler um item do LocalStorage
  readItem(key: string): any {
    const item = localStorage.getItem(key);
    this.user = item ? JSON.parse(item) : null;
  }

  // Atualizar um item no LocalStorage
  updateItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  // Deletar um item do LocalStorage
  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

  getAllItems(): string[] {
    const keys = Object.keys(localStorage);
    const items = keys.map(key => key + " - " + localStorage.getItem(key));
    return items.filter(item => item !== null) as string[];
  }

  onSearchKeyChange(): void {
    const value = localStorage.getItem(this.selectedKey);
    console.log('Valor encontrado:', value);
    if (value != null) {
      this.items = JSON.parse(value);
    }
    else
      this.items = [];
  }
}
