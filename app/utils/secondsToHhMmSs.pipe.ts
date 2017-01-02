import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'secondsToHhMmSs' })
export class SecondsToHhMmSsPipe implements PipeTransform {
    transform(seconds: number) {
        let hours = Math.trunc(seconds / 3600);
        let minutes = Math.trunc((seconds - (hours*3600)) / 60);
        let newSeconds = seconds - (hours*3600) - (minutes*60);
        return this.toPaddedString(hours, 2) + ':'
            + this.toPaddedString(minutes, 2) + ':'
            + this.toPaddedString(newSeconds, 2);
    }

    private toPaddedString(n: number, pad?: number) {
        if(!pad) {
            return String(n);
        } else {
            let result = '';
            let exp = pad - 1;
            while(exp > 0 && n < Math.pow(10, exp)) {
                result += '0';
                exp--;
            }
            result += n;
            return result;
        }
    }
}