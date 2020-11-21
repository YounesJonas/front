import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNationaliteComponent } from './admin-nationalite.component';

describe('AdminNationaliteComponent', () => {
  let component: AdminNationaliteComponent;
  let fixture: ComponentFixture<AdminNationaliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNationaliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNationaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
