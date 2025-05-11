import { EventEmitter, Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newTaskEventEmitter: EventEmitter<Task> = new EventEmitter();
  private _idTaskEventEmitter: EventEmitter<number> = new EventEmitter();
  private _findTaskByIdEventEmitter: EventEmitter<number> = new EventEmitter();
  private _selectTaskEventEmitter: EventEmitter<Task> = new EventEmitter();

  constructor() { }

  get newTaskEventEmitter(): EventEmitter<Task> {
    return this._newTaskEventEmitter;
  }

  get idTaskEventEmitter(): EventEmitter<number> {
    return this._idTaskEventEmitter;
  }

  get findTaskByIdEventEmitter(): EventEmitter<number> {
    return this._findTaskByIdEventEmitter;
  }

  get selectTaskEventEmitter(): EventEmitter<Task> {
    return this._selectTaskEventEmitter;
  }

}
