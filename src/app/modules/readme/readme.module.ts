import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared/shared.module';
import { ReadmeComponent } from '@readme/root/readme.component';
import { DocumentationComponent } from '@readme/documentation/documentation.component';
import { ExampleComponent } from '@readme/example/example.component';
import { README_ROUTING } from '@readme/readme.routing';

@NgModule({
  declarations: [
    ReadmeComponent,
    DocumentationComponent,
    ExampleComponent
  ],
  imports: [
  	SharedModule,
    README_ROUTING
  ],
  exports: [
    ReadmeComponent,
    DocumentationComponent,
    ExampleComponent
  ]
})
export class ReadmeModule { }
