import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStorage } from '../services/storage/storage.model';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tasksHome: TaskStorage[];
  
  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {
    this.getTasks();
  }

  ngOnInit(){
  }

  ionViewDidEnter() {
    this.getTasks();
  }

  toForm(){
    const url = "/form";
    this.router.navigateByUrl(url);
  }

  async getTasks() {
    this.tasksHome = await this.storageService.read();
  }

  async deleteTask(index: number) {
    this.tasksHome.splice(index,1);
    await this.storageService.update(this.tasksHome);
  }

  async clearAll() {
    this.tasksHome = await this.storageService.delete();
  }

}
