import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardMessageModalComponent } from './forward-message-modal.component';

describe('ForwardMessageModalComponent', () => {
  let component: ForwardMessageModalComponent;
  let fixture: ComponentFixture<ForwardMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForwardMessageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
