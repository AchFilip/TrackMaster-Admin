import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { TasksComponent } from './tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      { path: 'view', component: TasksViewComponent },
      { path: '**', redirectTo: 'view', pathMatch: 'full' },]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
