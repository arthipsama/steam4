import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpUserComponent } from './pop-up-user.component';

describe('PopUpUserComponent', () => {
  let component: PopUpUserComponent;
  let fixture: ComponentFixture<PopUpUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
