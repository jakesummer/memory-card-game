import { useEffect, useState } from "react";
import "./App.css";
import fetchData from "./utils/fetchData.js";
import Loading from "./components/Loading/Loading.jsx";

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

  return <>{apiStatus.isLoading && <Loading />}</>;
}

export default App;
