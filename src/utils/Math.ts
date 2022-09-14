import { ReactThreeFiber } from "@react-three/fiber";

export function coerce(value: number, min: number, max: number) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    }

    return value;
}

export function round(n: number, digits?: number) {

    if (digits === undefined) {
        digits = 0;
    }

    var factor = Math.pow(10, digits);

    return Math.round((n + Number.EPSILON) * factor) / factor
}

export function rgbToHex(red: number,green: number,blue: number) {
    var r = red.toString(16);
    var g = green.toString(16);
    var b = blue.toString(16);
  
    if (r.length === 1)
      r = "0" + r;
    if (g.length === 1)
      g = "0" + g;
    if (b.length === 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

export function toSciNotation(n: number){
  var [base, exp] = n.toExponential().split("e").map(item => Number(item));
  return {base, exp};
}

export function range(size: number, startAt = 0) {
  return Array.from({length: size}, (x, i) => i + startAt);
}