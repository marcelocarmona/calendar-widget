import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadmeComponent } from '@readme/root/readme.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/readme', pathMatch: 'full' },
  { path: '**', component: ReadmeComponent },
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);


