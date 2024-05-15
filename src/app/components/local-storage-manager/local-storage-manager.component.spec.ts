import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStorageManagerComponent } from './local-storage-manager.component';

describe('LocalStorageManagerComponent', () => {
  let component: LocalStorageManagerComponent;
  let fixture: ComponentFixture<LocalStorageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalStorageManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalStorageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
