import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadmeComponent } from '@readme/root/readme.component';

export const README_ROUTES: Routes = [
	{
	  path: 'readme',
	  children: [
	  	{ path: '', 
	  	  component: ReadmeComponent
	  	}
	  ]
	}
];

export const README_ROUTING: ModuleWithProviders = RouterModule.forChild(README_ROUTES);
