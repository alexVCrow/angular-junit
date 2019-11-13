import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SwitchButtonsComponent } from './components/shared/switch-buttons/switch-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SwitchButtonsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
