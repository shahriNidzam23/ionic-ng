import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { TaskForm } from './form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  form: TaskForm = new TaskForm;
  taskForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.form.task = new FormControl("", Validators.required);
    this.form.date = new FormControl("", Validators.required);
    this.form.time = new FormControl("", Validators.required);
    
    this.taskForm = new FormGroup({
      ...this.form
    });
  }

  async save(form: TaskForm){
    try {
      if(!form.task.valid) throw "Your Task is empty";
      if(!form.date.valid) throw "Task dateline (Date) is empty";
      if(!form.time.valid) throw "Task dateline (time) is empty";

      this.storageService.create(form);

      const toast = await this.toastCtrl.create({
        message: 'Success',
        position: 'top',
        duration: 3000,
        color: 'success'
      });

      toast.present();
      // console.log(form);
    } catch (e) {
      const toast = await this.toastCtrl.create({
        message: e,
        position: 'top',
        duration: 3000,
        color: 'danger'
      });

      toast.present();
    }
    // this.navCtrl.back();
  }

}
