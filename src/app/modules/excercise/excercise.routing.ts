import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcerciseRootComponent } from '@excercise/root/excercise.root.component';

export const EXCERCISE_ROUTES: Routes = [
	{
	  path: 'excercise',
	  children: [
	  	{ path: '', 
	  	  component: ExcerciseRootComponent
	  	}
	  ]
	}
];

export const EXCERCISE_ROUTING: ModuleWithProviders = RouterModule.forChild(EXCERCISE_ROUTES);
