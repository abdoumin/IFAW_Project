import "./hotel.css";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom"; // Add this import

import Select from "react-select";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/NavbarPers";

import "../../components/Slider/Slider.css";
import { JPA_API_URL } from "../../Constants";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import HeaderAuth from "../../components/layout/headers/HeaderAuth";

const Hotel = () => {
  const { id } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const { data, loading } = useFetch(`${JPA_API_URL}/estivageCentre/${id}`);
  const { data: reservations, loading: loadingReservations } = useFetch(
    `${JPA_API_URL}/estivageProduit/${id}/get/reservations`
  );

  const handleSelect = (ranges) => {
    setDates([ranges.selection]);
  };

  const calculateNights = (startDate, endDate) => {
    const difference = endDate.getTime() - startDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights(dates[0].startDate, dates[0].endDate);
    return nights * data.pricePerNight;
  };

  const isDateReserved = (date) => {
    if (!reservations) return false;
    return reservations.some((reservation) => {
      const startDate = new Date(reservation.dateDeDebut);
      const endDate = new Date(reservation.dateDeFin);
      return date >= startDate && date <= endDate;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderAuth/>
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow" onClick={() => setOpenModal(true)}>
            Reserve or Book Now!
          </button>
          <div className="hotelCredentialsContainer">
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span style={{fontSize : 16}}>{data.city}</span>
            </div>
          </div>

          <Slider id={id}></Slider>

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <div>{data.des}</div>
              <br></br>
              <ul>
                <li>Nom du responsable : {data.responsable}</li>
                <li>Tel : {data.tel}</li>
              </ul>
            </div>
            
            <div className="hotelDetailsPrice">
              <h1>Choisissez la date de votre séjour!</h1>
              {loading ? (
                <p>Loading reservations...</p>
              ) : (
                <DateRange
                  editableDateInputs={true}
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                  dayContentRenderer={(date) => (
                    <div style={{ color: isDateReserved(date) ? 'grey' : 'black' }}>
                      {date.getDate()}
                    </div>
                  )}
                />
              )}
              <button onClick={() => setShowPriceDetails(!showPriceDetails)}>
                See the prices
              </button>
            </div>

            {showPriceDetails && (
              <div className="hotelDetailsPriceCalculation">
                <h2>Price Details</h2>
                <div className="priceBreakdown">
                  <div className="priceRow">
                    <span>Price per night:</span>
                    <span>{data.pricePerNight} EUROS</span>
                  </div>
                  <div className="priceRow">
                    <span>Number of nights:</span>
                    <span>{calculateNights(dates[0].startDate, dates[0].endDate)}</span>
                  </div>
                  <div className="priceRow total">
                    <span>Total Price:</span>
                    <span>{calculateTotalPrice()} EUROS</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} dates={dates} />}
    </div>
  );
};

export default Hotel;
