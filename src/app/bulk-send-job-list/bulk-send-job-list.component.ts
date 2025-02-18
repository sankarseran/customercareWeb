import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, on } from '@ngrx/store';
import { BulkSendJob } from '../api/Types';
import { Observable } from 'rxjs';
import { ticketsFeature } from '../@state/tickets.reducer';
import {
  clearBulkSendMessages,
  getBulkSendMessages,
} from '../@state/tickets.actions';

@Component({
  selector: 'app-bulk-send-job-list',
  templateUrl: './bulk-send-job-list.component.html',
  styleUrls: ['./bulk-send-job-list.component.scss'],
})
export class BulkSendJobListComponent implements OnInit, OnDestroy {
  jobs$: Observable<BulkSendJob[]> = this.store.select(
    ticketsFeature.selectBulkSendJobs
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getBulkSendMessages());
  }

  checkStatus(): void {
    this.store.dispatch(getBulkSendMessages());
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBulkSendMessages());
  }
}
