import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearCartModalComponent } from './clear-cart-modal.component';

describe('ClearCartModalComponent', () => {
  let component: ClearCartModalComponent;
  let fixture: ComponentFixture<ClearCartModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearCartModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
