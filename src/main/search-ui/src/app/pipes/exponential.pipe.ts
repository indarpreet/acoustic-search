import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: "expo" })
export class ExponentialPipe implements PipeTransform {
    transform(value: number, exponent?: number, exponent2?: number): number {
        return Math.pow(value, isNaN(exponent) ? 1 : exponent) + exponent2;
    }
}