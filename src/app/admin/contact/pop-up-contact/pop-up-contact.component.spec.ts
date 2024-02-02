import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpContactComponent } from './pop-up-contact.component';

describe('PopUpContactComponent', () => {
  let component: PopUpContactComponent;
  let fixture: ComponentFixture<PopUpContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
