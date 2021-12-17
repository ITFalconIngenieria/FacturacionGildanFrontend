import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaExampleComponent } from './factura-example.component';

describe('FacturaExampleComponent', () => {
  let component: FacturaExampleComponent;
  let fixture: ComponentFixture<FacturaExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
