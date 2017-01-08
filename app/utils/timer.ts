import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

export class Timer {

    private subscription: Subscription;
    private observableTimedSequence = Observable.interval(1000);
    private startTime: Date;

    start(initialSeconds: number, tickCallback: Function) {
        this.startTime = new Date();
        this.subscription = this.observableTimedSequence.subscribe(x => {
            let now = new Date();
            let elapsed = initialSeconds + Math.floor((now.getTime() - this.startTime.getTime()) / 1000);
            tickCallback(elapsed);
        });
    }

    stop() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}