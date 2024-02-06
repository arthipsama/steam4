import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContactmeComponent } from './user-contactme.component';

describe('UserContactmeComponent', () => {
  let component: UserContactmeComponent;
  let fixture: ComponentFixture<UserContactmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserContactmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserContactmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
