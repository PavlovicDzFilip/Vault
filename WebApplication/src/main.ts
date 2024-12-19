import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeEditor } from '@core/config/quill-config'; // Import initializeEditor

// Initialize Quill editor
initializeEditor();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
