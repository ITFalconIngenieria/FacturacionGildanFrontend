import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumibleComponent } from './consumible.component';

describe('ConsumibleComponent', () => {
  let component: ConsumibleComponent;
  let fixture: ComponentFixture<ConsumibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
