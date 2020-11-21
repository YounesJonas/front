import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationClientComponent } from './identification-client.component';

describe('IdentificationClientComponent', () => {
  let component: IdentificationClientComponent;
  let fixture: ComponentFixture<IdentificationClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
