import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {
    url = 'http://localhost:3000';
    constructor(
        private http: HttpClient
    ) { }

    fetchAllData() {
        return this.http.get(this.url)
            .pipe(
                map(
                    (response: any) => {
                        return response;
                    },
                    error => {
                        console.log(error);
                    }
                )
            );
    }

    createTask(taskName) {
        const payloadObj = {
            taskName,
            completed: false
        };
        return this.http.post(this.url + '/add', payloadObj)
            .pipe(
                map(
                    (response: any) => {
                        return response.message;
                    },
                    (error: Error) => {
                        return 'Error Occurred';
                    }
                )
            );
    }

    deleteTask(id) {
        return this.http.get(this.url + '/delete/' + id)
            .pipe(
                map(
                    (response: any) => {
                        return response.message;
                    },
                    (error: Error) => {
                        return 'Error occurred';
                    }
                )
            );
    }
    updateTask(id) {
        const payload = {
            oldValue: {
                id
            }
        };
        return this.http.post(this.url + '/update', payload)
            .pipe(
                map(
                    (response: any) => {
                        return response.message;
                    },
                    (error: Error) => {
                        return 'Error occurred';
                    }
                )
            );
    }
}
