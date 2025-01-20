import axios from 'axios';
import { JPA_API_URL } from "../../Constants";

const estivageCentre1 = {
    name : "marina blanca",
    estivageCentreDates : [
        {
            startDate: "2023-05-02T18:00:00",
            endDate: "2023-05-05T18:00:00"
        },
        {
            startDate: "2022-05-02T18:00:00",
            endDate: "2022-05-05T18:00:00"
        }

    ],
}

const estivageCentre2 = {
    name : "marina blanca",
    estivageCentreDates : [
        {
            startDate: "2022-05-02T18:00:00",
            endDate: "2022-05-05T18:00:00"
        },
        {
            startDate: "2021-05-02T18:00:00",
            endDate: "2021-05-05T18:00:00"
        }

    ],
}

const estivageCentres = [estivageCentre1, estivageCentre2];


const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const isAvailable = async (estivageCentres, startDate, endDate, destination) => {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    // First filter centres by destination
    const filteredCentres = estivageCentres.filter(centre => 
      centre.name.toLowerCase().includes(destination.toLowerCase())
    );
    
    const availableCentres = [];
    
    for (const centre of filteredCentres) {
      let isCentreAvailable = true;
      
      try {
        // Get all products for this centre
        const productsResponse = await axios.get(
          `${JPA_API_URL}/estivageproduit/all/${centre.id}`,
          config
        );
        const products = productsResponse.data;
        
        // Check if at least one product is available
        for (const product of products) {
          // Get reservations for this product
          const reservationsResponse = await axios.get(
            `${JPA_API_URL}/estivageProduit/${product.id}/get/reservations`,
            config
          );
          const reservations = reservationsResponse.data;
          
          // Check if the product has no overlapping reservations
          const hasOverlap = reservations.some(reservation => {
            const reservationStart = new Date(reservation.dateDeDebut);
            const reservationEnd = new Date(reservation.dateDeFin);
            const searchStart = new Date(startDate);
            const searchEnd = new Date(endDate);
            
            return (
              (searchStart >= reservationStart && searchStart <= reservationEnd) ||
              (searchEnd >= reservationStart && searchEnd <= reservationEnd) ||
              (searchStart <= reservationStart && searchEnd >= reservationEnd)
            );
          });
          
          if (!hasOverlap) {
            // If at least one product is available, the centre is available
            isCentreAvailable = true;
            break;
          }
          
          isCentreAvailable = false;
        }
        
        if (isCentreAvailable) {
          availableCentres.push(centre);
        }
      } catch (error) {
        console.error(`Error checking availability for centre ${centre.id}:`, error);
        continue; // Skip to next centre if there's an error
      }
    }
    
    return availableCentres;
  };
  
console.log(isAvailable(estivageCentres,new Date("2021-05-02T18:00:00"),new Date("2021-05-05T18:00:00")));

export default isAvailable;


