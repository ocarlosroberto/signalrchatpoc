import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralTestComponent } from './peripheral-test.component';

describe('PeripheralTestComponent', () => {
  let component: PeripheralTestComponent;
  let fixture: ComponentFixture<PeripheralTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeripheralTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeripheralTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
