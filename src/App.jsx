import { useEffect, useState } from "react";
import "./App.css";
import fetchData from "./utils/fetchData.js";
import shuffleArray from "./utils/shuffleArray.js";
import Loading from "./components/Loading/Loading.jsx";
import CardGrid from "./components/CardGrid/CardGrid.jsx";

function App() {
  const [apiStatus, setApiStatus] = useState({
    data: [],
    isLoading: false,
    error: false,
  });

  useEffect(() => {
    let ignore = false;

    const startFetching = async () => {
      try {
        setApiStatus((prev) => ({ ...prev, isLoading: true }));
        const fetchedData = await fetchData();
        if (!ignore) {
          setApiStatus((prev) => ({ ...prev, data: fetchedData }));
        }
      } catch (error) {
        if (!ignore) {
          setApiStatus((prev) => ({ ...prev, error: error }));
        }
      } finally {
        if (!ignore) {
          setApiStatus((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    startFetching();

    return () => (ignore = true);
  }, []);

  return (
    <>
      {apiStatus.isLoading && <Loading />}
      {apiStatus.data.length > 0 && (
        <CardGrid data={shuffleArray(apiStatus.data)} />
      )}
    </>
  );
}

export default App;
