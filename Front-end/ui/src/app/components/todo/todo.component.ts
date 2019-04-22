import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    taskName;
    message = '';
    taskList = [];
    constructor(
        private dataService: DataProviderService
    ) { }

    ngOnInit() {
        this.fetchAllData();
    }

    fetchAllData() {
        this.dataService.fetchAllData().subscribe(
            (response: any) => {
                if (response.status === 'SUCCESS') {
                    this.taskList = response.data;
                }
                console.log(response);
            }
        );
    }

    addTask() {
        console.log(this.taskName);
        this.dataService.createTask(this.taskName)
            .subscribe(
                response => {
                    console.log(response);
                    this.message = response;
                    this.taskName = '';
                    this.fetchAllData();
                }
            );
    }

    deleteTask(id) {
        this.dataService.deleteTask(id)
            .subscribe(
                response => {
                    console.log(response);
                    this.message = response;
                    this.fetchAllData();
                }
            );
    }

}
