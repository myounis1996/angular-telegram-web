import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbCarouselModule, NgbDropdownModule, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import {SidebarComponent} from './sidebar/sidebar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ChatWindowComponent} from './chat-window/chat-window.component';
import {ChatMediaComponent} from './chat-window/chat-side/chat-media/chat-media.component';
import {ChatFilesComponent} from './chat-window/chat-side/chat-files/chat-files.component';
import {ChatLinksComponent} from './chat-window/chat-side/chat-links/chat-links.component';
import {ChatGroupsComponent} from './chat-window/chat-side/chat-groups/chat-groups.component';
import {ChatVoicesComponent} from './chat-window/chat-side/chat-voices/chat-voices.component';
import {FormsModule} from "@angular/forms";
import { ImagePreviewModalComponent } from './Modals/image-preview-modal/image-preview-modal.component';
import { DeleteMessageModalComponent } from './Modals/delete-message-modal/delete-message-modal.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ForwardMessageModalComponent } from './Modals/forward-message-modal/forward-message-modal.component';
import {CdkMenuModule} from '@angular/cdk/menu';
import { ChatHeaderComponent } from './chat-window/chat-header/chat-header.component';
import { ChatSideComponent } from './chat-window/chat-side/chat-side.component';
import {ChatBackgroundComponent} from "./chat-background/chat-background.component";
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatWindowComponent,
    ChatMediaComponent,
    ChatFilesComponent,
    ChatLinksComponent,
    ChatGroupsComponent,
    ChatVoicesComponent,
    ImagePreviewModalComponent,
    DeleteMessageModalComponent,
    ForwardMessageModalComponent,
    ChatHeaderComponent,
    ChatSideComponent,
    ChatBackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgOptimizedImage,
    CdkMenuModule,
    SimplebarAngularModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
