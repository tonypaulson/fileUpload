import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './services/app.config.service';

const providers=[
  AppConfigService
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: APP_INITIALIZER,
    useFactory:initAppConfig,
    deps:[AppConfigService],
    multi:true

  },
  providers
],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initAppConfig(appConfig:AppConfigService){
  return ()=> appConfig.loadConfiguration();
}
