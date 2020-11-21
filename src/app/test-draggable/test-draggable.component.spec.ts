import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDraggableComponent } from './test-draggable.component';

describe('TestDraggableComponent', () => {
  let component: TestDraggableComponent;
  let fixture: ComponentFixture<TestDraggableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDraggableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
