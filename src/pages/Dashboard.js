import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import { useGlobalContext } from "../context/context";

const Dashboard = () => {
  const { githubUser } = useGlobalContext();
  return (
    <main>
      <Navbar />
      <div className="section-center">
        <Search />

        <>
          <Info />
          <User />
          <Repos login={githubUser.login} />
        </>
      </div>
    </main>
  );
};

export default Dashboard;
