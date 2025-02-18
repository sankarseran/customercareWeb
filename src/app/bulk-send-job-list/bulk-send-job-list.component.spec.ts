import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSendJobListComponent } from './bulk-send-job-list.component';

describe('BulkSendJobListComponent', () => {
  let component: BulkSendJobListComponent;
  let fixture: ComponentFixture<BulkSendJobListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkSendJobListComponent]
    });
    fixture = TestBed.createComponent(BulkSendJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
