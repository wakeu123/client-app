import { routes } from './app.routes';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularSplitModule } from 'angular-split';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomTitleStrategy } from './shared/services/custom-title-strategy.service';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    titleStrategy(),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      BrowserModule, 
      BrowserAnimationsModule,
      FormsModule, 
      ReactiveFormsModule, 
      AngularSplitModule, 
      NgxSpinnerModule,
      ToastModule
    )
  ]
};

export function titleStrategy() {
  return {
    provide: TitleStrategy,
    useClass: CustomTitleStrategy
  };
}
