import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Provider } from '../../models/provider';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-create-provider-dialog',
  templateUrl: './create-provider-dialog.component.html',
  styleUrl: './create-provider-dialog.component.scss'
})
export class CreateProviderDialogComponent {
  countries: string[] = ['Perú', 'Chile', 'Argentina', 'México', 'Colombia'];
  providerForm: FormGroup;
  data: Provider = {
    id: null,
    tradeName: '',
    tid: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: '',
    country: '',
    anualRevenue: 0
  };
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public dialogRef: MatDialogRef<CreateProviderDialogComponent>,
    private fb: FormBuilder) { 
      this.providerForm = this.fb.group({
        tradeName: ['', Validators.required],
        tid: ['', [Validators.required, Validators.pattern(/^\d{11}$/),Validators.minLength(11)]] , 
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d+$/)]], 
        email: ['', [Validators.required, Validators.email]], 
        website: ['', [Validators.required,Validators.pattern(/https?:\/\/.+/)]], 
        address: ['', Validators.required], 
        country: ['', Validators.required], 
        anualRevenue: [0, [Validators.required, Validators.min(0)]],
        UserId: [localStorage.getItem('userId')]
      });
    }
    onSave(): void {
      if (this.providerForm.valid) {
        const providerData = this.providerForm.value;
        providerData.tid = providerData.tid.toString();

        providerData.anualRevenue = parseFloat(
          providerData.anualRevenue.replace(/[$,]/g, '')
        );

        console.log('Provider data:', providerData);
        this.dialogRef.close(providerData); 
      } else {
        this.providerForm.markAllAsTouched(); 
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
