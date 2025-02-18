import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  DestroyRef,
} from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Message, Ticket } from '../api/Types';
import { tap, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getTicket, getTicketMessages } from '../@state/tickets.actions';
import { ticketsFeature } from '../@state/tickets.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnChanges {
  @Input() ticketId: number = 0;
  ticket: Ticket | null = null;
  messages$ = this.store.select(ticketsFeature.selectTicketMessages);

  messageForm = this.fb.group({
    text: this.fb.control('', [Validators.required]),
  });

  private subscription: Subscription = new Subscription();

  constructor(
    private api: TicketsService,
    private snackBar: MatSnackBar,
    private destroyRef: DestroyRef,
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticketId'] && changes['ticketId'].currentValue) {
      this.loadTicketAndMessages(changes['ticketId'].currentValue);
    }
  }

  loadTicketAndMessages(ticketId: number): void {
    this.store.dispatch(getTicket({ payload: ticketId }));

    this.store
      .select(ticketsFeature.selectTicket)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        tap((ticket) => {
          if (ticket?.status === 'resolved') {
            this.messageForm.disable();
          } else {
            this.messageForm.enable();
          }
        })
      )
      .subscribe((ticket) => {
        this.ticket = ticket;
        this.store.dispatch(getTicketMessages({ payload: ticketId }));
      });

    this.messageForm.reset();
  }

  trackByItems(index: number, item: Message): number {
    return item.id;
  }

  closeTicket(): void {
    this.subscription.add(
      this.api
        .resolveTicket(this.ticketId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((t) => {
          this.loadTicketAndMessages(this.ticketId);
          this.snackBar.open('Ticket resolved', 'Close', { duration: 3000 });
        })
    );
  }

  sendMessage(): void {
    const { text } = this.messageForm.value;
    const senderType = 'operator',
      senderId = 'operator1';

    this.subscription.add(
      this.api
        .addMessageToTicket(this.ticketId, {
          text: text!,
          senderType,
          senderId,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((message) => {
          this.loadTicketAndMessages(this.ticketId);
          this.snackBar.open('Message sent', 'Close', { duration: 3000 });
        })
    );
  }
}
