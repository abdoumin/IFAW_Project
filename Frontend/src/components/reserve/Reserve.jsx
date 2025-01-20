import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { JPA_API_URL } from "../../Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./reserve2.css";

const Reserve = ({ setOpen, hotelId, dates }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const username = sessionStorage.getItem('authenticatedUser');

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Updated useFetch call with token
  const { data: products, loading: productsLoading } = useFetch(
    `${JPA_API_URL}/estivageproduit/all/${hotelId}`,
    config
  );

  const [availabilityStatus, setAvailabilityStatus] = useState({});

  useEffect(() => {
    const checkAvailability = async () => {
      if (!products) return;

      const availabilityChecks = {};
      
      for (const product of products) {
        try {
          // Added token to the GET request
          const response = await axios.get(
            `${JPA_API_URL}/estivageProduit/${product.id}/get/reservations`,
            config
          );
          const reservations = response.data;
          
          const isAvailable = !reservations.some(reservation => {
            const reservationStart = new Date(reservation.dateDeDebut);
            const reservationEnd = new Date(reservation.dateDeFin);
            const selectedStart = new Date(dates[0].startDate);
            const selectedEnd = new Date(dates[0].endDate);

            return (
              (selectedStart >= reservationStart && selectedStart <= reservationEnd) ||
              (selectedEnd >= reservationStart && selectedEnd <= reservationEnd) ||
              (selectedStart <= reservationStart && selectedEnd >= reservationEnd)
            );
          });

          availabilityChecks[product.id] = isAvailable;
        } catch (error) {
          console.error(`Error checking availability for product ${product.id}:`, error);
          availabilityChecks[product.id] = false;
        }
      }

      setAvailabilityStatus(availabilityChecks);
    };

    if (products && dates && token) {
      checkAvailability();
    }
  }, [products, dates, token]);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      // Create the request body with the selected dates
      const dateRequest = {
        startDate: dates[0].startDate.toISOString(), // Convert to ISO string format
        endDate: dates[0].endDate.toISOString()
      };

      await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.post(
            `${JPA_API_URL}/estivageProduit/${roomId}/reserve/${username}`,
            dateRequest,
            config
          );
        })
      );
      
      setOpen(false);
      navigate("/reservations");
    } catch (err) {
      console.error("Error making reservation:", err);
    }
  };
  return (
    <div className="reserve1">
      <div className="rContainer1">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose1"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {productsLoading ? (
          <p>Loading available rooms...</p>
        ) : (
          products?.map((item) => (
            <div className="rItem1" key={item.id}>
              <div className="rInfo1">
                <div className="rTitle1">{item.title}</div>
                <div className="rMax1">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rStatus1">
                  {availabilityStatus[item.id] ? "Available" : "Unavailable"}
                </div>
              </div>
              <div className="rSelectRooms1">
                <div className="room1">
                  <input
                    type="checkbox"
                    value={item.id}
                    onChange={handleSelect}
                    disabled={!availabilityStatus[item.id]}
                  />
                </div>
              </div>
            </div>
          ))
        )}
        <button onClick={handleClick} className="rButton1">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;