import { Directive, ElementRef, Input, HostListener } from '@angular/core';

const ColorHash = require('color-hash');

@Directive({ selector: '[colorHash]' })
export class ColorHashDirective {
    constructor(private el: ElementRef) {
        setTimeout(() => {
            this.colorizeFromString(this.colorHash || 'red');
        }, 0);
    }

    @Input('colorHash') colorHash: string;
 
    private colorizeFromString(str: string) {
        let colorHash = new ColorHash();
        let newGeneratedColor = colorHash.hex(str);
        this.el.nativeElement.style.backgroundColor = newGeneratedColor;
    }
}