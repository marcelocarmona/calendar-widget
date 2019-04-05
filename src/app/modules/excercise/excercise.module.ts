import { NgModule } from "@angular/core";
import { SharedModule } from "@modules/shared/shared.module";
import { ReadmeModule } from "@modules/readme/readme.module";
import { EXCERCISE_ROUTING } from "@excercise/excercise.routing";

import { ExcerciseRootComponent } from "@excercise/root/excercise.root.component";
import { CalendarWidgetComponent } from "./calendar-widget/calendar-widget.component";
import { EventComponent } from "./calendar-widget/event/event.component";

@NgModule({
  declarations: [
    ExcerciseRootComponent,
    CalendarWidgetComponent,
    EventComponent
  ],
  imports: [SharedModule, ReadmeModule, EXCERCISE_ROUTING],
  entryComponents: [],
  providers: [],
  exports: [ExcerciseRootComponent, CalendarWidgetComponent, EventComponent]
})
export class ExcerciseModule {}
