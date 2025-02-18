import { createFeature, createReducer, on } from '@ngrx/store';
import { initialState } from './tickets.state';
import {
  clearBulkSendMessages,
  getBulkSendMessages,
  getBulkSendMessagesFail,
  getBulkSendMessagesSuccess,
  getTicket,
  getTicketFail,
  getTicketMessages,
  getTicketMessagesFail,
  getTicketMessagesSuccess,
  getTickets,
  getTicketsFail,
  getTicketsSuccess,
  getTicketSuccess,
  setSelectedTickets,
} from './tickets.actions';

export const ticketsFeature = createFeature({
  name: 'list',
  reducer: createReducer(
    initialState,
    on(getTickets, (state) => ({
      ...state,
      loading: true,
    })),
    on(getTicketsSuccess, (state, { payload }) => ({
      ...state,
      tickets: payload,
      loading: false,
    })),
    on(getTicketsFail, (state) => ({
      ...state,
      tickets: [],
      loading: false,
    })),
    on(getTicket, (state) => ({
      ...state,
      ticket: null,
      loading: true,
    })),
    on(getTicketSuccess, (state, { payload }) => ({
      ...state,
      ticket: payload,
      loading: false,
    })),
    on(getTicketFail, (state) => ({
      ...state,
      ticket: null,
      loading: false,
    })),
    on(getTicketMessages, (state) => ({
      ...state,
      loading: true,
    })),
    on(getTicketMessagesSuccess, (state, { payload }) => ({
      ...state,
      ticketMessages: payload,
      loading: false,
    })),
    on(getTicketMessagesFail, (state) => ({
      ...state,
      ticketMessages: [],
      loading: false,
    })),
    on(setSelectedTickets, (state, { payload }) => ({
      ...state,
      selectedTickets: payload,
    })),
    on(clearBulkSendMessages, (state) => ({
      ...state,
      BulkSendJobs: [],
    })),
    on(getBulkSendMessages, (state) => ({
      ...state,
      loading: true,
    })),
    on(getBulkSendMessagesSuccess, (state, { payload }) => ({
      ...state,
      BulkSendJobs: payload,
      loading: false,
    })),
    on(getBulkSendMessagesFail, (state) => ({
      ...state,
      ticketMessages: [],
      loading: false,
    }))
  ),
});
