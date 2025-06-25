import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgField } from './img-field';

describe('ImgField', () => {
  let component: ImgField;
  let fixture: ComponentFixture<ImgField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
