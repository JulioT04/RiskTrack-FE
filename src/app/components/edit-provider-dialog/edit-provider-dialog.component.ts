import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Provider } from '../../models/provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';
@Component({
  selector: 'app-edit-provider-dialog',
  templateUrl: './edit-provider-dialog.component.html',
  styleUrl: './edit-provider-dialog.component.scss'
})
export class EditProviderDialogComponent {
  countries: string[] = ['Perú', 'Chile', 'Argentina', 'México', 'Colombia'];
  providerForm: FormGroup;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public dialogRef: MatDialogRef<EditProviderDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Provider
  ) {
    this.providerForm = this.fb.group({
      id: [this.data?.id ?? null],
      tradeName: [data.tradeName, Validators.required],
      tid: [
        data.tid,
        [Validators.required, Validators.pattern(/^\d{11}$/),Validators.minLength(11)],
      ],
      phoneNumber: [data.phoneNumber, [Validators.required, Validators.pattern(/^\+?\d+$/)]],
      email: [data.email, [Validators.required, Validators.email]],
      website: [data.website, [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      address: [data.address, Validators.required],
      country: [data.country, Validators.required],
      anualRevenue: [
        this.data?.anualRevenue ? formatCurrency(this.data.anualRevenue, this.locale, '$', 'USD', '1.2-2') : '',
        [Validators.required, Validators.min(0)],
      ],
      UserId: [localStorage.getItem('userId')]
    });
   }

  onSave(): void {
    if (this.providerForm.valid) {
      const providerData = this.providerForm.value;
      providerData.tid = providerData.tid.toString();

      providerData.anualRevenue = parseFloat(providerData.anualRevenue.replace(/[$,]/g, ''));


      console.log('Updated Provider Data:', providerData);
      this.dialogRef.close(providerData);
    }
  }
  formatCurrencyValue() {
    const control = this.providerForm.get('anualRevenue');
    if (control) {
      let value = control.value?.toString().replace(/[^0-9.]/g, '') || '0'; 
      if (isNaN(parseFloat(value))) {
        value = '0'; 
      }
      value = parseFloat(value);
  
      const formattedValue = formatCurrency(value, this.locale, '$', 'USD', '1.2-2');
      control.setValue(formattedValue, { emitEvent: false });
    }
  }
}
