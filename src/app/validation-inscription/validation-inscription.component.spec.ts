import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationInscriptionComponent } from './validation-inscription.component';

describe('ValidationInscriptionComponent', () => {
  let component: ValidationInscriptionComponent;
  let fixture: ComponentFixture<ValidationInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
