import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupsComponent } from './chat-groups.component';

describe('ChatGroupsComponent', () => {
  let component: ChatGroupsComponent;
  let fixture: ComponentFixture<ChatGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
