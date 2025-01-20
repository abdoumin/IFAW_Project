package org.example.estivage.dao;

import jakarta.enterprise.context.ApplicationScoped;
import org.example.estivage.entity.*;
import java.time.LocalDateTime;
import java.util.List;

public interface EstivageDao {

    EstivageCentre createEstivageCentre(EstivageCentre estivageCentre);

    void deleteEstivageCentre(Integer id);

    EstivageCentre getEstivageCentreById(Integer id);

    List<EstivageCentre> getAllEstivageCentres();

    List<EstivageProduit> getAllEstivageProduits(Integer id);

    EstivageProduit createEstivageProduit(EstivageProduit estivageProduit, EstivageCentre estivageCentre);

    void deleteEstivageProduit(Integer id);

    EstivageProduit getEstivageProduitById(Integer id);

    EstivageReservation createEstivageReservation(Integer id, EstivageReservation estivageReservation);

    EstivageReservation addDateDeReservation(
            EstivageProduit estivageProduit,
            LocalDateTime startDate,
            LocalDateTime endDate,
            User user  // Changed from UserDao to User
    );

    User findByUsername(String username);  // Changed from UserDao to User

    EstivageCentre addPhoto(EstivageCentre estivageCentre, EstivageCentrePhotos estivageCentrePhotos);

    EstivageCentre addPhotos(EstivageCentre estivageCentre, List<EstivageCentrePhotos> estivageCentrePhotos);

    List<EstivageReservation> getEstivageReservationByUsername(User user);  // Changed from UserDao to User
}