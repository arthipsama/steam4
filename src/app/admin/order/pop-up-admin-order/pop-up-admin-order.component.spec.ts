import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAdminOrderComponent } from './pop-up-admin-order.component';

describe('PopUpAdminOrderComponent', () => {
  let component: PopUpAdminOrderComponent;
  let fixture: ComponentFixture<PopUpAdminOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpAdminOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAdminOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
