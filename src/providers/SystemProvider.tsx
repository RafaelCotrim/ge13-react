import React, { ReactNode, useCallback, useState } from "react";
import { UnitSystem } from "../utils/Units";


export const SystemContext = React.createContext<[UnitSystem, (newUnit: UnitSystem) => void, <T>(astro: T, metric: T, imperial?: T) => T]>(["default", () => { }, (astro, metric, imperial) => checkSystemOutput("default", astro, metric, imperial)]);

export function SystemProvider({ children }: { children?: ReactNode }) {

  const [system, setSystem] = useState<UnitSystem>("default");

  const checkSystem = useCallback(<T,>(astro: T, metric: T, imperial?: T) => checkSystemOutput(system, astro, metric, imperial)
  , [system]);

  return (
    <SystemContext.Provider value={[system, setSystem, checkSystem]}>
      {children}
    </SystemContext.Provider>
  );
}

function checkSystemOutput<T>(system: UnitSystem, astro: T, metric: T, imperial?: T){
  if (system === "default") {
    return astro;
  } else if (system === "metric" || imperial === undefined) {
    return metric;
  } else {
    return imperial;
  }
}
