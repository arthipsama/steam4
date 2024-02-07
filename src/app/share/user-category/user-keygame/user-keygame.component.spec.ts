import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKeygameComponent } from './user-keygame.component';

describe('UserKeygameComponent', () => {
  let component: UserKeygameComponent;
  let fixture: ComponentFixture<UserKeygameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKeygameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKeygameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
