import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import ContributorsUI from "./components/ContributorsUI";
import AddContributorForm from "./components/AddContributors";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const refetechUsers = async () => {
    fetchAllUsers();
  }

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(`/api/contributors`);
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-container">
      <div className="logos">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React!</h1>
      <ContributorsUI contributors={users} />
      <AddContributorForm refetechUsers={refetechUsers} />
    </div>
  );
}

export default App;
