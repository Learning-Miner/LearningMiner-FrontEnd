import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy, DoCheck } from '@angular/core';

import { ConceptComponent } from './concept.component';
import { Proposition } from './conceptmap.types';
import { MouseService } from './mouse.service';
import { SelectionService, Selectable } from './selection.service';
import { ComponentManager } from './componentmanager.service';

import { ie } from './etc';

/**
 * Function used to calculate how proposition lines are to be clipped by concepts
 */
function rectangleClip(rectWidth, rectHeight, x, y): {x: number, y: number} {

  let heightBound = rectHeight / 2;
  let widthBound = rectWidth / 2;
  /*
    * The two condition below indecates the direction of the 'from' concept at the 'to' concept
    * which is needed to decide which edge of the 'to' concept should be used for clipping.
    *
    * t1, t2 will show values as illustrated below.
    *             \  false, true /
    *              +------------+
    * false, false | to concept | true, true
    *              +------------+
    *             /  true, false \
    */
  let t1 = heightBound / widthBound * x + y > 0;  // true - on lower right region, false - on upper left region
  let t2 = heightBound / widthBound * x - y > 0;  // true - on upper right region, false - on lower left region

  let clipped = {x: 0, y: 0};

  if (t1) {
    if (t2) {
      // true, ture - clip with the right edge
      clipped.x = -widthBound;
      clipped.y = -widthBound * y / x;
    } else {
      // true, false - clip with the bottom edge
      clipped.y = -heightBound;
      clipped.x = -heightBound * x / y;
    }
  } else {
    if (t2) {
      // false, ture - clip with the top edge
      clipped.y = heightBound;
      clipped.x = heightBound * x / y;
    } else {
      // false, false - clip with the left edge
      clipped.x = widthBound;
      clipped.y = widthBound * y / x;
    }
  }

  return clipped;
}

/**
 * Proposition component. Define the Proposition html element.
 * This element further contains an SVG path and a label.
 */
@Component({
  selector: 'cm-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./conceptmap.component.css']
})
export class PropositionComponent implements OnInit, OnDestroy, DoCheck, Selectable {

  @Input() proposition: Proposition;

  selected: boolean = false;

  preventSelect: boolean = true;

  editable: boolean = false;

  @ViewChild('label') label: ElementRef;

  from: ConceptComponent;
  to: ConceptComponent;

  private shape = {
    from: {height: 0, width: 0},
    to: {height: 0, width: 0},
    diff: {x: 0, y: 0},
    startClipping: {x: 0, y: 0},
    endClippint: {x: 0, y: 0},
    label: {x: 0, y: 0}
  };

  constructor(
    protected selection: SelectionService,
    protected mouse: MouseService,
    protected manager: ComponentManager
  ) { }

  get labelX() {
    return (this.from.concept.x + this.shape.startClipping.x + this.to.concept.x + this.shape.endClippint.x) / 2;
  }

  get labelY() {
    return (this.from.concept.y + this.shape.startClipping.y + this.to.concept.y + this.shape.endClippint.y) / 2;
  }

  get ie() {
    return ie;
  }

  get svgLinePath() {
    return [
      'M', this.from.concept.x + this.shape.startClipping.x, this.from.concept.y + this.shape.startClipping.y,
      'L', this.to.concept.x + this.shape.endClippint.x, this.to.concept.y + this.shape.endClippint.y
    ].join(' ');
  }

  ngOnInit() {
    this.manager.addPropositionComponent(this);
    this.from = this.manager.getConceptComponent(this.proposition.from);
    this.to = this.manager.getConceptComponent(this.proposition.to);

    // get focus on creation
    if (!this.proposition.text) { // todo - a better way to detect is needed.
      window.setTimeout(() => {
        this.selection.clear();
        this.selection.addPropositionComponent(this);
        this.enableEdit();
      }, 0);
    }
  }

  ngDoCheck() {
    // update line path if needed //
    let vx = this.to.concept.x - this.from.concept.x;
    let vy = this.to.concept.y - this.from.concept.y;
    if (
        this.shape.diff.x !== vx || this.shape.diff.y !== vy
        ||
        this.shape.from.width !== this.from.width || this.shape.from.height !== this.from.height
        ||
        this.shape.to.width !== this.to.width || this.shape.to.height !== this.to.height
      ) {
      this.shape.diff.x = vx;
      this.shape.diff.y = vy;
      this.shape.from.width = this.from.width;
      this.shape.from.height = this.from.height;
      this.shape.to.width = this.to.width;
      this.shape.to.height = this.to.height;

      let fromClipped = rectangleClip(this.from.width, this.from.height, -this.shape.diff.x, -this.shape.diff.y);
      let toClipped = rectangleClip(this.to.width, this.to.height, this.shape.diff.x, this.shape.diff.y);

      this.shape.startClipping.x = fromClipped.x;
      this.shape.startClipping.y = fromClipped.y;
      this.shape.endClippint.x = toClipped.x;
      this.shape.endClippint.y = toClipped.y;
    }
  }

  ngOnDestroy() {
    this.manager.removePropositionComponent(this);
  }

  select() {
    this.selected = true;
  }

  deselect(): void {
    this.selected = false;
    if (this.editable) {
      this.disableEdit();
    }
  }

  enableEdit() {
    this.editable = true;
    this.preventSelect = false;

    window.setTimeout(() => {
      this.label.nativeElement.focus();
      let range = document.createRange();
      range.selectNodeContents(this.label.nativeElement);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }, 0);
  }

  disableEdit() {
    this.editable = false;
    this.preventSelect = true;
  }

  doubleClick(event) {
    event.stopPropagation();
    // when not selecting
    if (!event.ctrlKey && !event.shiftKey) {
      if (!this.editable) {
        this.enableEdit();
      }
    }
  }

  mouseDown(event) {
    this.mouse.down(this, event);
    if (event.which === 1) {
      if (!this.editable /* disable drag while been editable */) {

        if (event.ctrlKey || event.shiftKey) {
          if (this.selected) {
            let dragged = false;
            this.mouse.drag(
              e => dragged = true,
              e => {
                if (e.browserEvent.which === 1 && !dragged) {
                  this.selection.removePropositionComponent(this);
                }
              }
            );
          } else {
            this.selection.addPropositionComponent(this);
          }
        } else {
          if (this.selected) {
            let dragged = false;
            this.mouse.drag(
              e => dragged = true,
              e => {
                if (e.browserEvent.which === 1 && !dragged) {
                  this.selection.clear();
                  this.selection.addPropositionComponent(this);
                }
              }
            );
          } else {
            this.selection.clear();
            this.selection.addPropositionComponent(this);
          }
        }

        this.mouse.drag(
          e => {
            this.mouse.cursorStyle = 'move';
            for (let c of this.selection.selectedConceptComponent) {
              if (c !== this.from && c !== this.to) {
                c.concept.x += e.browserEvent.movementX;
                c.concept.y += e.browserEvent.movementY;
              }
            }
            for (let c of [this.from, this.to]) {
              c.concept.x += e.browserEvent.movementX;
              c.concept.y += e.browserEvent.movementY;
            }

          },
          e => {
            if (e.browserEvent.which === 1)  {
              this.mouse.cursorStyle = 'default';
            }
          }
        );

      }
    }
    event.stopPropagation();
  }

  mouseUp(event) {
    this.mouse.up(this, event);
    event.stopPropagation();
  }

  keyDown(event) {
    if (
        (event.ctrlKey && !event.shiftKey && !event.altKey && (event.key ? event.key.toUpperCase() === 'A' : event.which === 65))
        ||
        (event.key === 'Delete' || event.key === 'Del' || event.which === 46)
      ) {
      event.stopPropagation();
    }
    setTimeout(() => {}, 0);  // used to manually trigger angular life cycle check to detect element size change.
  }

}
