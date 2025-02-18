import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsService } from './api/tickets.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { TicketNotFoundComponent } from './ticket-not-found/ticket-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TicketsEffects } from './@state/tickets.effects';
import { ticketsFeature } from './@state/tickets.reducer';
import { BulkMessageModalComponent } from './components/bulk-message-modal/bulk-message-modal.component';
import { BulkSendJobListComponent } from './bulk-send-job-list/bulk-send-job-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketsListComponent,
    TicketComponent,
    TicketNotFoundComponent,
    BulkMessageModalComponent,
    BulkSendJobListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    TicketsService,
    provideStore(),
    provideState(ticketsFeature),
    provideEffects(TicketsEffects),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
