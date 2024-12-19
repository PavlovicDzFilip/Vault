import { InjectionToken } from '@angular/core';
import { AppConfig } from '@core/models/AppConfig';

export const AUTH_TOKEN = new InjectionToken<string>('AUTH_TOKEN');
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

