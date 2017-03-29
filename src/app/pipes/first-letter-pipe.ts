import { Pipe, PipeTransform } from '@angular/core';
/*
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalizefirst
 * Example:
 *  // value.name = daniel
 *  {{ value.name | capitalizefirst  }}
 *  fromats to: Daniel
*/
@Pipe({
    name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {
    transform(value: string, args: any[]): string {
        if (!value) return '';
        let splittedValue = value.split(" ");
        if (splittedValue[0]) {
            if (splittedValue[1]) {
                return splittedValue[0].charAt(0).toUpperCase() + splittedValue[1].charAt(0).toUpperCase();
            }
            return splittedValue[0].charAt(0).toUpperCase();
        }
        return "";

    }
}