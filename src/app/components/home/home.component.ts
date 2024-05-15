import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PeripheralTestComponent } from '../peripheral-test/peripheral-test.component';
import { LocalStorageManagerComponent } from '../local-storage-manager/local-storage-manager.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, PeripheralTestComponent, LocalStorageManagerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
}
