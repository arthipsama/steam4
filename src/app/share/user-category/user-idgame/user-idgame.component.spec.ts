import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdgameComponent } from './user-idgame.component';

describe('UserIdgameComponent', () => {
  let component: UserIdgameComponent;
  let fixture: ComponentFixture<UserIdgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIdgameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIdgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
