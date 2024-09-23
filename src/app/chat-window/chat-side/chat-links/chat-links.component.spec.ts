import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLinksComponent } from './chat-links.component';

describe('ChatLinksComponent', () => {
  let component: ChatLinksComponent;
  let fixture: ComponentFixture<ChatLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
