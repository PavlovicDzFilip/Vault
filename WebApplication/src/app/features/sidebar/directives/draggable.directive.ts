import { Directive, HostListener, output, signal } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  dragging = output<MouseEvent>();
  dragEnd = output<void>();

  #isDragging = signal<boolean>(false);

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.#isDragging.set(true);
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.#isDragging()) {
      this.dragging.emit(event);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.#isDragging()) {
      this.#isDragging.set(false);
      this.dragEnd.emit();
    }
  }

}
