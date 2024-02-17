import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryQueueComponent } from './discovery-queue.component';

describe('DiscoveryQueueComponent', () => {
  let component: DiscoveryQueueComponent;
  let fixture: ComponentFixture<DiscoveryQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoveryQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoveryQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
