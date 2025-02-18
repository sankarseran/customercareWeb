import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BulkSendJob, Message, Ticket } from './Types';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  getTickets(status: 'resolved' | 'unresolved' | 'all'): Observable<Ticket[]> {
    type Body = {
      data: Ticket[];
    };
    return this.http
      .get<Body>(`${this.baseUrl}/tickets`, {
        params: status !== 'all' ? { status } : {},
      })
      .pipe(
        map((r) => r.data),
        map((x) =>
          x.map(({ createdAt, ...other }) => ({
            ...other,
            createdAt: new Date(createdAt),
          }))
        )
      );
  }

  getTicket(ticketId: number): Observable<Ticket> {
    console.log('getTicket', ticketId);
    return this.http.get<Ticket>(`${this.baseUrl}/tickets/${ticketId}`).pipe(
      map(({ createdAt, ...other }) => ({
        ...other,
        createdAt: new Date(createdAt),
      }))
    );
  }

  getTicketMessages(ticketId: number): Observable<Message[]> {
    console.log('getTicketMessages', ticketId);
    type Body = {
      data: Message[];
    };
    return this.http
      .get<Body>(`${this.baseUrl}/tickets/${ticketId}/messages`)
      .pipe(
        map((r) => r.data),
        map((x) =>
          x.map(({ createdAt, ...other }) => ({
            ...other,
            createdAt: new Date(createdAt),
          }))
        )
      );
  }

  resolveTicket(ticketId: number) {
    return this.http.put(`${this.baseUrl}/tickets/${ticketId}/resolve`, {});
  }

  addMessageToTicket(
    ticketId: number,
    message: Pick<Message, 'text' | 'senderType' | 'senderId'>
  ) {
    return this.http
      .post<Message>(`${this.baseUrl}/tickets/${ticketId}/messages`, message)
      .pipe(
        map(({ createdAt, ...other }) => ({
          ...other,
          createdAt: new Date(createdAt),
        }))
      );
  }

  bulkMessageToTicket(payload: {
    ticketIds: number[];
    message: string;
    senderId: string;
    senderType: string;
  }) {
    return this.http
      .post<{ jobId: string }>(`${this.baseUrl}/bulk-send`, payload)
      .pipe(map((r) => r.jobId));
  }

  getBulkMessages() {
    return this.http.get<BulkSendJob[]>(`${this.baseUrl}/bulk-sends`);
  }
}
