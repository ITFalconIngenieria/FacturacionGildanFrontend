import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceAguaComponent } from './balance-agua.component';

describe('BalanceAguaComponent', () => {
  let component: BalanceAguaComponent;
  let fixture: ComponentFixture<BalanceAguaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceAguaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceAguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
