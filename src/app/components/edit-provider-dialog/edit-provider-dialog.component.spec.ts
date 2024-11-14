import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProviderDialogComponent } from './edit-provider-dialog.component';

describe('EditProviderDialogComponent', () => {
  let component: EditProviderDialogComponent;
  let fixture: ComponentFixture<EditProviderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProviderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProviderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
