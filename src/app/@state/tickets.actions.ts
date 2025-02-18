import { createAction, props } from '@ngrx/store';
import { BulkSendJob, Message, Ticket, TicketStatus } from '../api/Types';

export const getTickets = createAction(
  '[List] Get Tickets',
  props<{ payload: TicketStatus }>()
);
export const getTicketsSuccess = createAction(
  '[List] Get Tickets Success',
  props<{ payload: Ticket[] }>()
);
export const getTicketsFail = createAction('[List] Get Tickets Fail');

export const getTicket = createAction(
  '[Detail] Get Ticket',
  props<{ payload: number }>()
);
export const getTicketSuccess = createAction(
  '[Detail] Get Ticket Success',
  props<{ payload: Ticket }>()
);
export const getTicketFail = createAction('[Detail] Get Ticket Fail');

export const getTicketMessages = createAction(
  '[Detail] Get Ticket Messages',
  props<{ payload: number }>()
);
export const getTicketMessagesSuccess = createAction(
  '[Detail] Get Ticket Messages Success',
  props<{ payload: Message[] }>()
);
export const getTicketMessagesFail = createAction(
  '[Detail] Get Ticket Messages Fail'
);

export const setSelectedTickets = createAction(
  '[List] Select Ticket',
  props<{ payload: Ticket[] }>()
);

export const getBulkSendMessages = createAction(
  '[List] Get Bulk Send Messages',
);
export const getBulkSendMessagesSuccess = createAction(
  '[List] Get Bulk Send Messages Success',
  props<{ payload: BulkSendJob[] }>()
);
export const getBulkSendMessagesFail = createAction(
  '[List] Get Bulk Send Messages Fail'
);

export const clearBulkSendMessages = createAction(
  '[List] Clear Bulk Send Messages'
);
