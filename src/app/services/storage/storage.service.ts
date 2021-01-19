import { Injectable } from '@angular/core';
import { TaskForm } from 'src/app/form/form.model';
import { Plugins } from '@capacitor/core';
import { TaskStorage } from './storage.model';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  tasks: TaskStorage[] = [];

  constructor() { }
  //CRUD
  async create(form: TaskForm) {
    const task: TaskStorage = {
      task: form.task.value,
      date: form.date.value,
      time: form.time.value,
    };

    this.tasks.push(task);

    await Storage.set({
      key: 'task',
      value: JSON.stringify(this.tasks),
    });
  }

  async read() {
    const data = await Storage.get({key: 'task'});
    const object = JSON.parse(data.value);

    if (object) {
      this.tasks = object as TaskStorage[];
    }

    // this.tasks = object as TaskStorage[];

    // return this.tasks ?? [];
    return this.tasks;
  }

  async update(tasks: TaskStorage[]) {
    this.tasks = tasks;

    await Storage.set({
      key: 'task',
      value: JSON.stringify(this.tasks),
    });
  }

  async delete() {
    await Storage.remove({key: 'task'});
    this.tasks = [];
    return this.tasks;
  }
}
