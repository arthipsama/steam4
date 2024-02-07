import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSteamwalletComponent } from './user-steamwallet.component';

describe('UserSteamwalletComponent', () => {
  let component: UserSteamwalletComponent;
  let fixture: ComponentFixture<UserSteamwalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSteamwalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSteamwalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
