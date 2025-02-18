import { TicketsService } from './../api/tickets.service';
import { Ticket, Message, BulkSendJob } from './../api/Types';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as TicketActions from './tickets.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class TicketsEffects {
  constructor(private actions$: Actions, private service: TicketsService) {}

  getTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.getTickets),
      switchMap((action) =>
        this.service.getTickets(action.payload).pipe(
          map((response: Ticket[]) =>
            TicketActions.getTicketsSuccess({ payload: response })
          ),
          catchError(() => of(TicketActions.getTicketsFail()))
        )
      )
    )
  );

  getTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.getTicket),
      switchMap((action) =>
        this.service.getTicket(action.payload).pipe(
          map((response: Ticket) =>
            TicketActions.getTicketSuccess({ payload: response })
          ),
          catchError(() => of(TicketActions.getTicketFail()))
        )
      )
    )
  );

  getTicketMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.getTicketMessages),
      switchMap((action) =>
        this.service.getTicketMessages(action.payload).pipe(
          map((response: Message[]) =>
            TicketActions.getTicketMessagesSuccess({ payload: response })
          ),
          catchError(() => of(TicketActions.getTicketMessagesFail()))
        )
      )
    )
  );

  getBulkSendMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.getBulkSendMessages),
      switchMap((action) =>
        this.service.getBulkMessages().pipe(
          map((response: BulkSendJob[]) =>
            TicketActions.getBulkSendMessagesSuccess({ payload: response })
          ),
          catchError(() => of(TicketActions.getBulkSendMessagesFail()))
        )
      )
    )
  );
}
