import "./list.css";
import Navbar from "../../components/NavbarPers";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import isAvailable from"./HelperMethods";
import { JPA_API_URL } from "../../Constants";
import HeaderAuth from "../../components/layout/headers/HeaderAuth";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState("");
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // const { data, loading, error, reFetch } = useFetch(
  //   `/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  // );

  const { data,setData, loading, error, reFetch } = useFetch(
    `${JPA_API_URL}/estivagecentre/all`
  );
  const {data : allEstivages } = useFetch(`${JPA_API_URL}/estivagecentre/all`);
  console.log(data);

  const handleClick = async () => {
    try {
      const availableCentres = await isAvailable(
        allEstivages,
        dates[0].startDate, 
        dates[0].endDate,
        destination || '' // Use empty string if destination is not set
      );
      setData(availableCentres);
    } catch (error) {
      console.error("Error searching for available centres:", error);
      // Optionally add error handling UI feedback here
    }
  };
  return (
    <div>
      <HeaderAuth/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input 
                placeholder="Where are you going?" 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => {
                    setDates([item.selection]);
                  }}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
