import { Component, DestroyRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketsService } from '../../api/tickets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface BulkSendData {
  ticketIds: number[];
}

@Component({
  selector: 'app-bulk-message-modal',
  templateUrl: './bulk-message-modal.component.html',
  styleUrls: ['./bulk-message-modal.component.scss'],
})
export class BulkMessageModalComponent {
  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BulkMessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BulkSendData,
    private api: TicketsService,
    private snackBar: MatSnackBar,
    private destroyRef: DestroyRef
  ) {
    this.messageForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  sendMessage(): void {
    if (this.messageForm.invalid) {
      return;
    }
    const { text } = this.messageForm.value;
    const senderType = 'operator';
    const senderId = 'operator1';

    this.api
      .bulkMessageToTicket({
        ticketIds: this.data.ticketIds,
        message: text,
        senderType,
        senderId,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.snackBar.open('Bulk message process begin', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.log(err);
          this.snackBar.open('Error sending bulk message', 'Close', {
            duration: 3000,
          });
        },
      });
  }
}
