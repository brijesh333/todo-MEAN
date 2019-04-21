import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    taskName;
    constructor() { }

    ngOnInit() {
    }

    addTask() {
        console.log(this.taskName);
        this.taskName='';
    }

}
