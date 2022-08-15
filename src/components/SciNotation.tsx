import { round, toSciNotation } from "../utils/Math";


interface SciNotationProps {
    value: number,
    cutoff?: number,
    precision?: number
}

export function SciNotation({value, cutoff = 4, precision = 0}: SciNotationProps) {
    
    var {base, exp} = toSciNotation(value);
    
    if(exp < cutoff){
       return <>{round(value, precision)}</> 
    } else {
        return <>{round(base, cutoff)} * 10<sup>{exp}</sup></>
    }

}
