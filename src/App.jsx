// REACT IMPORTS
import { useEffect, useState } from "react";

// SERVICE IMPORT
import { api } from "./services/api";

// COMPONENTS IMPORTS
import { Header } from "./components/Header";
import { LastResult } from "./components/LastResult";

function App() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    getLastResults();
  }, []);

  const getLastResults = async () => {
    const resultArray = [];
    const res = await api.get("/current/last/results.json");
    const result = res.data.MRData.RaceTable.Races[0].Results;

    try {
      for (let d of result) {
        resultArray.push({
          Pos: <div className="data__center">{d.position}</div>,
          Nº: <div className="data__center">{d.number}</div>,
          Driver: (
            <>
              {d.Driver.givenName}
              <p>
                <strong>{d.Driver.familyName}</strong>
              </p>
            </>
          ),
          Card: d.Constructor.name,
          Pts: <div className="data__center">{d.points}</div>,
        });
      }
      setResult(resultArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <LastResult data={result} />
      </div>
    </div>
  );
}

export default App;
