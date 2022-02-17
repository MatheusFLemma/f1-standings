// REACT IMPORTS
import { useEffect, useState } from "react";

// SERVICE IMPORT
import { api } from "./services/api";

// COMPONENTS IMPORTS
import { Header } from "./components/Header";
import { LastResult } from "./components/LastResult";
import { Drivers } from "./components/Drivers";
import { Constructors } from "./components/Teams";

function App() {
  const [result, setResult] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [constructors, setConstructors] = useState([]);

  useEffect(() => {
    getLastResults();
    getDriver();
    getConstructors();
  }, []);

  const getLastResults = async () => {
    const resultArray = [];
    const res = await api.get("/current/last/results.json");
    const result = res.data.MRData.RaceTable.Races[0].Results;

    try {
      for (let r of result) {
        resultArray.push({
          Pos: <div className="centered">{r.position}</div>,
          Nº: <div className="centered">{r.number}</div>,
          Driver: (
            <>
              {r.Driver.givenName}
              <p>
                <strong>{r.Driver.familyName}</strong>
              </p>
            </>
          ),
          Car: r.Constructor.name,
          Pts: <div className="centered">{r.points}</div>,
        });
      }
      setResult(resultArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getDriver = async () => {
    const driverArray = [];
    const res = await api.get("/current/driverStandings.json");
    const result =
      res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    try {
      for (let d of result) {
        driverArray.push({
          Pos: <div className="centered">{d.position}</div>,
          Nº: <div className="centered">{d.Driver.permanentNumber}</div>,
          Driver: (
            <>
              <p>{d.Driver.givenName}</p>
              <strong>{d.Driver.familyName}</strong>
            </>
          ),
          Car: <div className="centered">{d.Constructors[0].name}</div>,
          Pts: <div className="centered">{d.points}</div>,
        });
      }
      setDrivers(driverArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getConstructors = async () => {
    const constructorsArray = [];
    const res = await api.get("/current/constructorStandings.json");
    const result =
      res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    try {
      for (let d of result) {
        constructorsArray.push({
          Pos: <div className="centered">{d.position}</div>,
          Team: d.Constructor.name,
          Pts: <div className="centered">{d.points}</div>,
        });
      }
      setConstructors(constructorsArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <LastResult data={result} />
        <Drivers data={drivers} />
        <Constructors data={constructors} />
      </main>
    </div>
  );
}

export default App;
