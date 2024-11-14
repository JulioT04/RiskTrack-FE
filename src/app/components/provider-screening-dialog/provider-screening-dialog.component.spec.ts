import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderScreeningDialogComponent } from './provider-screening-dialog.component';

describe('ProviderScreeningDialogComponent', () => {
  let component: ProviderScreeningDialogComponent;
  let fixture: ComponentFixture<ProviderScreeningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderScreeningDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderScreeningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
