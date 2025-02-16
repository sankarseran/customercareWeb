import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Message, Ticket } from '../api/Message';
import { catchError, Observable, switchMap, tap, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnChanges, OnDestroy {
  @Input() ticketId: number = 0; // Input property for ticketId
  ticket: Ticket | null = null;
  messages$: Observable<Message[]> | null = null;
  messageForm = this.fb.group({
    text: this.fb.control('', [Validators.required]),
  });

  private subscription: Subscription = new Subscription();

  constructor(
    private api: TicketsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialization logic (if needed)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // React to changes in the ticketId input
    if (changes['ticketId'] && changes['ticketId'].currentValue) {
      this.loadTicketAndMessages(changes['ticketId'].currentValue);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscription.unsubscribe();
  }

  loadTicketAndMessages(ticketId: number): void {
    // Load ticket details
    this.api.getTicket(ticketId).pipe(
      tap((ticket) => {
        if (ticket.status === 'resolved') {
          this.messageForm.disable();
        } else {
          this.messageForm.enable();
        }
      })
    ).subscribe((ticket) => {
      this.ticket = ticket;
      this.messages$ = this.api.getTicketMessages(ticket.id);
    });

    // Load messages for the ticket
    // this.messages$ = this.ticket$.pipe(
    //   switchMap(({ id }) => ),
    //   catchError((err, caught) => {
    //     this.router.navigate(['home', 'tickets', 'not-found']);
    //     return caught;
    //   })
    // );

    // Reset the message form
    this.messageForm.reset();
  }

  trackByItems(index: number, item: Message): number {
    return item.id;
  }

  closeTicket(): void {
    this.subscription.add(
      this.api.resolveTicket(this.ticketId).subscribe((t) => {
        this.loadTicketAndMessages(this.ticketId); // Reload ticket after resolving
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
        .subscribe((message) => {
          this.loadTicketAndMessages(this.ticketId); // Reload ticket after sending a message
          this.snackBar.open('Message sent', 'Close', { duration: 3000 });
        })
    );
  }
}
