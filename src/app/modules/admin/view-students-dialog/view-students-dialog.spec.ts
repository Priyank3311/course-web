import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentsDialog } from './view-students-dialog';

describe('ViewStudentsDialog', () => {
  let component: ViewStudentsDialog;
  let fixture: ComponentFixture<ViewStudentsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStudentsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
