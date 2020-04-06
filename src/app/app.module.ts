import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule, MenubarModule, DialogModule } from 'primeng/primeng';

import { AppComponent } from './app.component';

import { ConceptMapModule } from './conceptmap-module/conceptmap.module';
import { EditorComponent } from './editor/editor.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
    ConceptMapModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
