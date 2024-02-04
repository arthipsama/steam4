import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdminDetailComponent } from './order-admin-detail.component';

describe('OrderAdminDetailComponent', () => {
  let component: OrderAdminDetailComponent;
  let fixture: ComponentFixture<OrderAdminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAdminDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
