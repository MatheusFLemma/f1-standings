// REACT IMPORTS
import { useEffect, useState } from "react";

// SERVICE IMPORT
import { api } from "./services/api";

// COMPONENTS IMPORTS
import { Header } from "./components/Header";
import { LastResult } from "./components/LastResult";
import { Drivers } from "./components/Drivers";

function App() {
  const [result, setResult] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getLastResults();
    getDriver();
  }, []);

  const getLastResults = async () => {
    const resultArray = [];
    const res = await api.get("/current/last/results.json");
    const result = res.data.MRData.RaceTable.Races[0].Results;

    try {
      for (let r of result) {
        resultArray.push({
          Pos: <div className="data__center">{r.position}</div>,
          Nº: <div className="data__center">{r.number}</div>,
          Driver: (
            <>
              {r.Driver.givenName}
              <p>
                <strong>{r.Driver.familyName}</strong>
              </p>
            </>
          ),
          Card: r.Constructor.name,
          Pts: <div className="data__center">{r.points}</div>,
        });
      }
      setResult(resultArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getDriver = async () => {
    const driverArray = [];
    const res = await api.get("/2021/driverStandings.json");
    const result =
      res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    try {
      for (let d of result) {
        driverArray.push({
          Pos: <div className="data__center">{d.position}</div>,
          Nº: <div className="data__center">{d.Driver.permanentNumber}</div>,
          Driver: (
            <>
              {d.Driver.givenName}
              <p>
                <strong>{d.Driver.familyName}</strong>
              </p>
            </>
          ),
          Card: d.Constructors[0].name,
          Pts: <div className="data__center">{d.points}</div>,
        });
      }
      setDrivers(driverArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <LastResult data={result} />
        <Drivers data={drivers} />
      </div>
    </div>
  );
}

export default App;
