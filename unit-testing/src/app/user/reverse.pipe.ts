import { Pipe } from "@angular/core";

@Pipe({
    name: 'reverse'
})
export class ReversePipe {
    transform(valu: string){
        return valu.split('').reverse().join('');
    }
}