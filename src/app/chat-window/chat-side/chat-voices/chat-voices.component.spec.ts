import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVoicesComponent } from './chat-voices.component';

describe('ChatVoicesComponent', () => {
  let component: ChatVoicesComponent;
  let fixture: ComponentFixture<ChatVoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatVoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatVoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
