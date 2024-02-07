import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllproductComponent } from './user-allproduct.component';

describe('UserAllproductComponent', () => {
  let component: UserAllproductComponent;
  let fixture: ComponentFixture<UserAllproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAllproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAllproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
