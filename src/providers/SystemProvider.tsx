import React, { ReactNode, useState } from "react";
import { UnitSystem } from "../utils/Units";


export const SystemContext = React.createContext<[UnitSystem, (newUnit: UnitSystem) => void]>(["default", () => {}]);

export function SystemProvider({children} : {children?: ReactNode}) {
  
    const [unit, setUnit] = useState<UnitSystem>("default");

    return (
      <SystemContext.Provider value={[unit, setUnit]}>
        {children}
      </SystemContext.Provider>

    );
  }
  