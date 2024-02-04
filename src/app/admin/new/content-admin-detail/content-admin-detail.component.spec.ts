import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAdminDetailComponent } from './content-admin-detail.component';

describe('ContentAdminDetailComponent', () => {
  let component: ContentAdminDetailComponent;
  let fixture: ComponentFixture<ContentAdminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentAdminDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
