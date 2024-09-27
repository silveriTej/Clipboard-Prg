import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'; 

import { AppComponent } from './app.component';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';

@NgModule({
  declarations: [
    AppComponent,
    CopyToClipboardDirective
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
