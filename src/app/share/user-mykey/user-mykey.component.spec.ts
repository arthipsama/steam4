import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMykeyComponent } from './user-mykey.component';

describe('UserMykeyComponent', () => {
  let component: UserMykeyComponent;
  let fixture: ComponentFixture<UserMykeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMykeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMykeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
