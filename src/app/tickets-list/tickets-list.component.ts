import { Component, OnInit, DestroyRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Ticket, TicketStatus } from '../api/Types';
import { getTickets } from '../@state/tickets.actions';
import { ticketsFeature } from '../@state/tickets.reducer';
import {
  BulkMessageModalComponent,
  BulkSendData,
} from '../components/bulk-message-modal/bulk-message-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit {
  public TicketStatus = TicketStatus;
  tickets$: Observable<Ticket[]> = this.store.select(
    ticketsFeature.selectTickets
  );

  filterStatus = this.fb.control<TicketStatus>(TicketStatus.all);
  selectedItems: Ticket[] = [];
  tickets: Ticket[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      getTickets({ payload: this.filterStatus.value as TicketStatus })
    );
    this.filterStatus.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        this.store.dispatch(getTickets({ payload: status as TicketStatus }));
        this.selectedItems = [];
      });

    this.tickets$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tickets) => {
        this.tickets = tickets;
      });
  }
  trackByItems(index: number, item: Ticket): number {
    return item.id;
  }

  toggleSelection(item: Ticket): void {
    const index = this.selectedItems.findIndex(
      (selected) => selected.id === item.id
    );
    if (index === -1) {
      this.selectedItems = [...this.selectedItems, item];
    } else {
      this.selectedItems = this.selectedItems.filter(
        (selected) => selected.id !== item.id
      );
    }
  }

  selectAll(event: any): void {
    if (event.checked) {
      this.selectedItems = this.tickets.filter(
        (ticket) => ticket.status === TicketStatus.unresolved
      );
    } else {
      this.selectedItems = [];
    }
  }

  isPartiallySelected(): boolean {
    const unresolved = this.tickets.filter(
      (ticket) => ticket.status === TicketStatus.unresolved
    );
    return (
      this.selectedItems.length > 0 &&
      this.selectedItems.length < unresolved.length
    );
  }

  isSelected(ticket: Ticket): boolean {
    return this.selectedItems.some((item) => item.id === ticket.id);
  }

  openBulkSendModal(): void {
    if (!this.selectedItems.length) {
      return;
    }
    const ticketIds = this.selectedItems.map((ticket) => ticket.id);
    const dialogRef = this.dialog.open<
      BulkMessageModalComponent,
      BulkSendData,
      boolean
    >(BulkMessageModalComponent, {
      width: '50%',
      data: { ticketIds },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.selectedItems = [];
          this.router.navigate(['home', 'bulkMessages']);
        }
      });
  }
}
