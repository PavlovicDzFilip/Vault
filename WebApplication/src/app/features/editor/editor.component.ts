import { ChangeDetectionStrategy, Component, inject, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { WebWorkerService } from '@core/services/web-worker.service';
import { ContentChange, QuillEditorComponent, SelectionChange } from 'ngx-quill';

@Component({
  selector: 'app-editor',
  imports: [QuillEditorComponent],
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {
  /**
   * Quill editor modules configuration
   * must be provided to the <quill-editor /> component
   */
  readonly editorModules = { // TODO: move somewhere this config
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  #webWorkerService = inject(WebWorkerService);
  #ngZone = inject(NgZone);

  editorContent = signal<string>('');

  ngOnInit(): void {
    this.#spawnJobHandlingProcess();
  }

  ngOnDestroy(): void {
    this.#webWorkerService.removeMessageListener();
    this.#webWorkerService.destroyWorker();
  }

  onContentChanged(content: ContentChange): void {
    console.log('Content changed:', content);

    this.#ngZone.runOutsideAngular(() => {
      // Perform any other operations that do not require Angular's change detection
      // todo: store somewhere current content.html or content.text strings
    });
  }

  onSelectionChanged(selection: SelectionChange): void {
    console.log('Selection changed:', selection);

    this.#ngZone.runOutsideAngular(() => {
      // Perform any other operations that do not require Angular's change detection
    });
  }

  #spawnJobHandlingProcess(): void {
    this.#webWorkerService.onMessage((message) => {
      this.#handleMessage(message);
    });
  }

  #handleMessage(message: string): void {
    console.log(`Message received: ${message}`);
  }
}
