import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/global/models/tasks/task.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { TasksService } from 'src/app/global/services/tasks/tasks.service';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent implements OnInit {
  public tasks: TaskModel[] = [];
  public title: string = '';
  public description: string = '';
  constructor(
    private tasksService: TasksService,
    private socketService: SocketsService
  ) { }

  ngOnInit(): void {
    this.getAllTasks();

    // Susbcribe to socket event and set callback
    this.socketService.subscribe("tasks_update", (data: any) => {
      this.getAllTasks();
    });
  }

  private getAllTasks(): void {
    this.tasksService.getAll().subscribe((result) => {
      this.tasks = result;
    });
  }

  public postTask(): void {
    // Emit event for update tasks

    // this--> const task = new TaskModel({ title: this.title, description: this.description });
    const task = new TaskModel();
    // or that -->
    task.title = this.title;
    task.description = this.description;

    this.tasksService.create(task).subscribe((result) => {
      this.title = '';
      this.description = '';
      this.socketService.publish("tasks_update", task);
    });
  }

  public deleteTask(task: TaskModel): void {
    const response = confirm("Are you sure you want to delete this task?");
    if (response) {
      this.tasksService.delete(task._id).subscribe(() => {
        this.getAllTasks();
        this.socketService.publish("tasks_update", {});
      });
    }
  }
}
