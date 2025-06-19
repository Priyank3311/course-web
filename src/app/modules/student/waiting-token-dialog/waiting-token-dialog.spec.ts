import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingTokenDialog } from './waiting-token-dialog';

describe('WaitingTokenDialog', () => {
  let component: WaitingTokenDialog;
  let fixture: ComponentFixture<WaitingTokenDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitingTokenDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingTokenDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
