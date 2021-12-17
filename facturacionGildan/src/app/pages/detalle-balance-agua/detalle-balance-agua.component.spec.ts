import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBalanceAguaComponent } from './detalle-balance-agua.component';

describe('DetalleBalanceAguaComponent', () => {
  let component: DetalleBalanceAguaComponent;
  let fixture: ComponentFixture<DetalleBalanceAguaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleBalanceAguaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBalanceAguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
