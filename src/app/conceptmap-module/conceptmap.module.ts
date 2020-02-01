import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ConceptMapComponent } from './conceptmap/conceptmap.component';
import { ConceptComponent } from './concept/concept.component';
import { PropositionComponent } from './proposition/proposition.component';
import { HandleComponent } from './handle/handle.component';
import { MouseService  } from './services/mouse.service';
import { SelectionService  } from './services/selection.service';
import { ConceptMap } from './conceptmap/conceptmap.types';
import { ComponentManager } from './services/componentmanager.service';
import { ContenteditableDirective } from './directives/contenteditable.directive';

/**
 * ConceptMap module
 */
@NgModule({
  declarations: [
    ConceptMapComponent,
    ConceptComponent,
    PropositionComponent,
    HandleComponent,
    ContenteditableDirective
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ConceptMapComponent
  ],
  providers: [
    MouseService,
    SelectionService,
    ConceptMap,
    ComponentManager
  ]
})
export class ConceptMapModule {

}
