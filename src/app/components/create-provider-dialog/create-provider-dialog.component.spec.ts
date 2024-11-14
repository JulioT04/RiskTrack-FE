import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProviderDialogComponent } from './create-provider-dialog.component';

describe('CreateProviderDialogComponent', () => {
  let component: CreateProviderDialogComponent;
  let fixture: ComponentFixture<CreateProviderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProviderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProviderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
