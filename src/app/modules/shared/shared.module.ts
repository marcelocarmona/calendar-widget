import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@modules/angular-material/angular-material.module';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
  	ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
  	CommonModule,
  	FormsModule,
  	ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class SharedModule {}
