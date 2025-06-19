import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextControllComponent } from './text-controll.component';

describe('TextControllComponent', () => {
  let component: TextControllComponent;
  let fixture: ComponentFixture<TextControllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextControllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
