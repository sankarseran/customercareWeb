import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMessageModalComponent } from './bulk-message-modal.component';

describe('BulkMessageModalComponent', () => {
  let component: BulkMessageModalComponent;
  let fixture: ComponentFixture<BulkMessageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkMessageModalComponent]
    });
    fixture = TestBed.createComponent(BulkMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
