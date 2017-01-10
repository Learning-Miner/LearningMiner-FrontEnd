import { Component, Input, OnChanges, DoCheck } from '@angular/core';

import { Concept, ConceptMap, Proposition } from './conceptmap.types';
import { Task, MouseService  } from './mouse.service';
import { ConceptComponent } from './concept.component';

import { ie } from './etc';

/**
 * Handle component. used to create propositions.
 * This component is draggable so the user can create propositions by dragging from a concept to another.
 */
@Component({
  selector: 'cm-handle',
  templateUrl: './handle.component.html',
  styleUrls: ['./conceptmap.component.css']
})
export class HandleComponent implements DoCheck, OnChanges {

  @Input() from: ConceptComponent;

  x: number;
  y: number;

  conceptPosition = {x: -1, y: -1, height: -1};
  dragged: boolean;

  constructor(
    private mouse: MouseService,
    private cmap: ConceptMap
  ) { }

  get ie () {
    return ie;
  }

  ngOnChanges() {
    this.x = this.from.concept.x;
    this.y = this.from.concept.y - this.from.height / 2 - 16;
  }

  ngDoCheck() {
    // update handle position after the concept has updated its height.
    setTimeout(() => {
      // check if the belonging concept moved and update position if needed
      if (
        this.from.concept.x !== this.conceptPosition.x
        ||
        this.from.concept.y !== this.conceptPosition.y
        ||
        this.from.height !== this.conceptPosition.height
      ) {
        this.conceptPosition.x = this.from.concept.x;
        this.conceptPosition.y = this.from.concept.y;
        this.conceptPosition.height = this.from.height;
        this.x = this.from.concept.x;
        this.y = this.from.concept.y - this.from.height / 2 - 16;
      }
    }, 0);
  }

  createProposition(from: Concept, to: Concept) {
    // Check if there is already a proposition
    for (let i of this.cmap.propositions) {
      if (i.from === from && i.to === to || i.from === to && i.to === from) {
        return;
      }
    }
    this.cmap.propositions.push(new Proposition('', from, to));  // todo - replace stub
  }

  linePath() {
    return [
      'M', this.from.concept.x, this.from.concept.y,
      'L', this.x, this.y
    ].join(' ');
  }

  mouseDown(event) {
    this.mouse.pressedOn(this, event);
    if (event.which === 1) {
      let dragTask = new Task(this.mouse, 'mousemove', (e, unregister) => {
        this.dragged = true;
        this.x = this.mouse.position.x;
        this.y = this.mouse.position.y;
      });

      new Task(this.mouse, 'mouseup', (e, unregister) => {
        if (e.which === 1)  {
          setTimeout(() => {
            // todo - replace this error prone structure
            if (this.mouse.state[1].target && this.mouse.state[1].target.concept) {
              this.createProposition(this.from.concept, this.mouse.state[1].target.concept);
            }
            this.dragged = false;
            this.x = this.from.concept.x;
            this.y = this.from.concept.y - this.from.height / 2 - 16;
            dragTask.unRegister();
            unregister();
          }, 0);
        }
      });
    }
    event.stopPropagation();
  }
}
