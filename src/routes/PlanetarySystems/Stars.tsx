import { useState } from "react";
import Card from "../../components/Card";
import { Table } from "../../components/Table";
import { Star } from "../../models/Star";
import Orbits from "./Orbits";
import StarComparison from "./StarComparison";
import StarProperties from "./StarProperties";

export function PlanetarySystem() {

  const [star, setStar] = useState(new Star(1, "Your Star"));

  return (
    <>
      <h1 className='text-center text-3xl sm:text-5xl max-w-lg mx-auto font-bold text-white'>Stars</h1>

      <div className=" text-xs md:text-lg grid grid-cols-1 xl:grid-cols-12 gap-5 p-5">
        <StarProperties className=" max-w-prose m-auto xl:col-span-5" star={star} setStar={(star) => setStar(star)}/>
        {/* <Card className="max-w-prose w-full mx-auto xl:max-w-none xl:col-span-5">
          <Table full headers={["Test", "Test", "Test"]}>

          </Table>
        </Card> */}
        <StarComparison className="xl:col-span-7 min-h-screen xl:min-h-0" star={star}/>
        
      </div>

      {/* <Orbits star={star}/> */}
    </>
  );
}

