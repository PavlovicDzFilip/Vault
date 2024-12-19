import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebWorkerService {
  #worker: Worker | undefined;
  #messageListener: ((event: MessageEvent) => void) | undefined;

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.#worker = new Worker(new URL('../webworker/app.worker.ts', import.meta.url));
    }
  }


  /**
   * Testing Web Workers, we can separate those methods into separate services
   */
  compute(data: number): void {
    if (!this.#worker) {
      return;
    }

    this.#worker.postMessage(data);
  }

  destroyWorker() {
    if (this.#worker) {
      this.#worker.terminate();
      this.#worker = undefined;
    }
  }

  getWorkerInstance(): Worker | undefined {
    return this.#worker;
  }

  onMessage(callback: (message: string) => void): void {
    this.#messageListener = ({ data }: MessageEvent) => {
      callback(data);
    };
    this.#worker?.addEventListener('message', this.#messageListener);
  }

  removeMessageListener(): void {
    if (this.#messageListener) {
      this.#worker?.removeEventListener('message', this.#messageListener);
      this.#messageListener = undefined;
    }
  }
}
