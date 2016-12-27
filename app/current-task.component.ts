import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'current-task',
    templateUrl: './current-task.component.html'
})
export class CurrentTaskComponent {

    onStart() {
        // start the clock
    }

    onPause() {
        // pause the clock
    }

    onEnd() {
        // create new task object and send it to task repository
    }
}
