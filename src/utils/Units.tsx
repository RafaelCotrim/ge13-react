import { ReactNode } from "react";

type NoneUnit = "none"
type MassUnit = "kg" | "sm" | "lb";
type LengthUnit = "m" | "km" | "sr" | "mi" | "au";
type PowerUnit = "w" | "sl";
type TimeUnit = "s" | "gyr";
type TemperatureUnit = "k" | "c" | "f";
type DensityUnit = "g/cm3" | "sd" | "kg/m3" | "lbs/ft3";

export type AnyUnit = NoneUnit
    | MassUnit
    | LengthUnit
    | PowerUnit
    | TimeUnit
    | TemperatureUnit
    | DensityUnit;

export type UnitSystem = "default" | "metric" | "imperial"

interface Unit {
    to_base: number,
    offset?: number
    name?: {
        singular?: string,
        plural?: string,
        symbol?: ReactNode,
    }
}

const massUnits: Record<MassUnit, Unit> = {
    sm: {
        to_base: 2e30,
        name: {
            plural: "Solar Masses"
        }
    },
    kg: {
        to_base: 1
    },
    lb: {
        to_base: 0.453592
    }
}

const lengthUnits: Record<LengthUnit, Unit> = {
    m: {
        to_base: 1
    },
    km: {
        to_base: 1000,
        name: {
            singular: "Kilometer",
            plural: "Kilometers",
            symbol: "km"
        }
    },
    sr: {
        to_base: 6.957e8,
        name: {
            singular: "Solar Radius",
            plural: "Solar Radii"
        }
    },
    mi: {
        to_base: 1609.34,
        name: {
            singular: "Mile",
            plural: "Miles",
            symbol: "mi"
        }
    },
    au: {
        to_base: 1.496e+11,
        name: {
            singular: "Astronomical Unit",
            plural: "Astronomical Units",
            symbol: "AU"
        }
    }
}

const powerUnits: Record<PowerUnit, Unit> = {
    w: {
        to_base: 1,
        name: {
            singular: "Watt",
            plural: "Watts",
            symbol: "W"
        }
    },
    sl: {
        to_base: 3.828e26,
        name: {
            singular: "Solar Luminosity",
            plural: "Solar Luminosities"
        }
    }
}

const timeUnits: Record<TimeUnit, Unit> = {
    s: {
        to_base: 1
    },
    gyr: {
        to_base: 3.16e16,
        name: {
            singular: "Billion years",
            plural: "Billion years"
        }
    }
}

const temperatureUnits: Record<TemperatureUnit, Unit> = {
    k: {
        to_base: 1,
        name: {
            singular: "Kelvin",
            plural: "Kelvin",
            symbol: "K"
        }
    },
    c: {
        to_base: 1,
        offset: 273.15,
        name: {
            singular: "Celsius",
            plural: "Celsius",
            symbol: "°C",
        }
    },
    f: {
        to_base: 5 / 9,
        offset: 459.67,
        name: {
            singular: "Fahrenheit",
            plural: "Fahrenheit",
            symbol: "°F",
        }
    }
}

const densityUnits: Record<DensityUnit, Unit> = {
    "g/cm3": {
        to_base: 1,
        name:{
            symbol: <>g/cm<sup>3</sup> </>
        }
    },
    "kg/m3": {
        to_base: 1/1000,
        name: {
            symbol: <>kg/m<sup>3</sup></>
        }
    },
    "sd":{
        to_base: 1.408,
        name: {
            singular: "Solar Density",
            plural: "Solar Densities"
        }
    },
    "lbs/ft3": {
        to_base: 1/62.4,
        name: {
            symbol: <>lbs/ft<sup>3</sup></>
        }
    }
}

const noneUnit: Record<NoneUnit, Unit> = {
    none: {
        to_base: 1
    }
}

export const UNITS: Record<AnyUnit, Unit> = {
    ...noneUnit,
    ...massUnits,
    ...lengthUnits,
    ...powerUnits,
    ...timeUnits,
    ...temperatureUnits,
    ...densityUnits
};

export class Quantity {
    private _value: number
    private _unit: AnyUnit

    constructor(value: number, unit?: AnyUnit) {
        this._value = value;
        this._unit = unit ?? "none";
    }

    public get value() {
        return this._value;
    }

    public from(unit: AnyUnit) {
        this._unit = unit;

        return this;
    }

    public to(unit: AnyUnit) {

        if (this._unit == unit) {
            return this;
        }

        var from = UNITS[this._unit];
        var to = UNITS[unit];

        var base = (this._value * from.to_base) + (from.offset ?? 0);
        this._value = (base - (to.offset ?? 0)) / to.to_base

        return this;
    }
}

export function convert(value: number) {
    return new Quantity(value);
}

export function unitName(unit: AnyUnit){
    var u = UNITS[unit];

    return u.name?.symbol ?? u.name?.plural ?? u.name?.singular;
}