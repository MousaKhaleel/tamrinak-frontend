import React, { useEffect, useState } from "react";
import { fetchSports } from "../../Services/sportService";
import SportCard from "./SportCard";
import Footer from "../Footer/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";

const SportsPage = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSports = async () => {
      const data = await fetchSports();
      setSports(data);
      setLoading(false);
    };

    getSports();
  }, []);

  if (loading) {
    return <div className="text-center">جار التحميل...</div>;
  }

  return(
    <div>
    <NavigationBar />
   <SportCard sports={sports} />
    <Footer />
</div>
  )
   ;
};

export default SportsPage;
