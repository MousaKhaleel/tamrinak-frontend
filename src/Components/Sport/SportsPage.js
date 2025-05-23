import React, { useEffect, useState } from "react";
import { fetchSports } from "../../Services/sportService";
import SportCard from "./SportCard";

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
   <SportCard sports={sports} />
</div>
  )
   ;
};

export default SportsPage;
