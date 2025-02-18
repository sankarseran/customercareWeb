import { Message, Ticket, BulkSendJob } from '../api/Types';

export interface TicketState {
  tickets: Ticket[];
  selectedTickets: Ticket[];
  ticket: Ticket | null;
  ticketMessages: Message[];
  loading: boolean;
  BulkSendJobs: BulkSendJob[];
}

export const initialState: TicketState = {
  tickets: [],
  selectedTickets: [],
  ticket: null,
  ticketMessages: [],
  loading: false,
  BulkSendJobs: [],
};
