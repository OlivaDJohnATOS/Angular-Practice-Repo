import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit{
    constructor(private elemenRef: ElementRef) {
        
    }

    ngOnInit(): void {
        this.elemenRef.nativeElement.style.backgroundColor = 'green';
    }
}