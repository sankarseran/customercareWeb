export enum TicketStatus {
  unresolved = 'unresolved',
  resolved = 'resolved',
  all = 'all',
}
export type SenderType = 'operator' | 'customer';

export interface Ticket {
  id: number;
  subject: string;
  status: TicketStatus;
  createdAt: Date;
}

export interface Message {
  id: number;
  senderType: SenderType;
  senderId: string;
  text: string;
  createdAt: Date;
}

export interface BulkSendJob {
  jobId: string;
  senderId: string;
  senderType: string;
  ticketIds: number[];
  message: string;
  status: string;
  totalTickets: number;
  processedTickets: number;
  errorCount: number;
  createdAt: Date;
  completedAt?: Date;
  failures: { ticketId: number; customerId: string }[];
}

