import { MESSAGES, MESSAGE_INTERVAL, TOTAL_TRANSITION } from './constants.js';
import { getTimeMessage } from './TimeMessage.js';

export class MessageRotator {
  constructor(board) {
    this.board = board;
    // Mix static messages with the dynamic world-clock generator
    this.messages = [...MESSAGES, getTimeMessage];
    this.currentIndex = -1;
    this._timer = null;
    this._paused = false;
  }

  _resolveMessage(index) {
    const msg = this.messages[index];
    return typeof msg === 'function' ? msg() : msg;
  }

  start() {
    // Show first message immediately
    this.next();

    // Begin auto-rotation
    this._timer = setInterval(() => {
      if (!this._paused && !this.board.isTransitioning) {
        this.next();
      }
    }, MESSAGE_INTERVAL + TOTAL_TRANSITION);
  }

  stop() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    this.board.displayMessage(this._resolveMessage(this.currentIndex));
    this._resetAutoRotation();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.messages.length) % this.messages.length;
    this.board.displayMessage(this._resolveMessage(this.currentIndex));
    this._resetAutoRotation();
  }

  _resetAutoRotation() {
    // Reset timer when user manually navigates
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = setInterval(() => {
        if (!this._paused && !this.board.isTransitioning) {
          this.next();
        }
      }, MESSAGE_INTERVAL + TOTAL_TRANSITION);
    }
  }
}
