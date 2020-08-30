import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementComponent } from './paiement.component';

describe('PaiementComponent', () => {
  let component: PaiementComponent;
  let fixture: ComponentFixture<PaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check date paiement is invalid', () => {
    const date_paiement = component.formGroup.controls['date_paiement'];
    expect(date_paiement.valid).toBeFalse();
    expect(date_paiement.errors['required']).toBeTruthy();
    date_paiement.setValue('azertyDecapitation ');

    expect(date_paiement.errors['required']).toBeTruthy();
  });

  it('should check date paiement is valid', () => {
    const date_paiement = component.formGroup.controls['date_paiement'];
    date_paiement.setValue('12/10/1993');

    expect(date_paiement.errors['required']).toBeNull();
  });
});
