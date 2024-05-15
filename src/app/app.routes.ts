import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LocalStorageManagerComponent } from './components/local-storage-manager/local-storage-manager.component';

export const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"localstoragemanager",component:LocalStorageManagerComponent}
];
