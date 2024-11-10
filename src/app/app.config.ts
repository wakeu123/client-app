import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomTitleStrategy } from './shared/services/custom-title-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    titleStrategy(),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(FormsModule, ReactiveFormsModule, AngularSplitModule, BrowserModule, BrowserAnimationsModule)
  ]
};

export function titleStrategy() {
  return {
    provide: TitleStrategy,
    useClass: CustomTitleStrategy
  };
}
