import data from '../data.json';
import { coerce, rgbToHex, round } from '../utils/Math';

export class Star {
    public static readonly sol = new Star(1)

    private _mass: number;

    constructor(mass: number) {
        this._mass = mass;
    }

    public get mass(){
        return this._mass;
    }

    public getRadius() {
        return this._mass < 1 ? Math.pow(this._mass, 0.8) : Math.pow(this._mass, 0.57);
    }

    public getLuminosity() {
        if (this._mass < 0.43) {
            return 0.23 * Math.pow(this._mass, 2.3);
        } else if (this._mass < 2) {
            return Math.pow(this._mass, 4);
        } else {
            return 1.4 * Math.pow(this._mass, 3.5);
        }
    }

    public getLifeExpectancy() {
        return this._mass * 10 / this.getLuminosity();
    }

    public getTemperature() {
        return Math.pow(this.getLuminosity() / Math.pow(this.getRadius(), 2), 1.0 / 4) * 5776.2;
    }

    public getDensity() {
        return this._mass / Math.pow(this.getRadius(), 3)
    }

    public getHabitableZoneStart(){
        return Math.pow(this.getLuminosity() / 1.1, 1 / 2);
    }

    public getHabitableZoneEnd(){
        return Math.pow(this.getLuminosity() / 0.53, 1 / 2);
    }

    public getHabtableZone() {
        return { start: this.getHabitableZoneStart(), end: this.getHabitableZoneEnd() };
    }

    public getClassification() {

        var temperature = this.getTemperature();

        for (const starClass of data.MK) {
            if (temperature >= starClass.min && temperature < starClass.max) {

                var range = (1 - (temperature - starClass.min) / (starClass.max - starClass.min)) * 10;
                return starClass.name + round(range, 1).toFixed(1) + "V";
            }
        }

        return "-"
    }

    public getColor() {
        var cent_temp = this.getTemperature() / 100;
        var red = 0;
        var green = 0;
        var blue = 0;

        if (cent_temp <= 66) {
            red = 255;
            green = coerce(99.4708025861 * Math.log(cent_temp) - 161.1195681661, 0, 255);
            blue = 0;
        } else {
            red = cent_temp - 60;
            red = 329.698727446 * (Math.pow(red, -0.1332047592));
            red = coerce(red, 0, 255);

            green = cent_temp - 60;
            green = 288.1221695283 * (Math.pow(green, -0.0755148492));
            green = coerce(green, 0, 255);
        }

        if (cent_temp >= 66) {
            blue = 255;
        } else {
            blue = cent_temp - 10;
            blue = coerce(138.5177312231 * Math.log(blue) - 305.0447927307, 0, 255);
        }

        red = round(red);
        green = round(green);
        blue = round(blue);

        return rgbToHex(red, green, blue);
    }

    public isValid() {
        return this._mass > 0.075 && this._mass < 100;
    }
}

