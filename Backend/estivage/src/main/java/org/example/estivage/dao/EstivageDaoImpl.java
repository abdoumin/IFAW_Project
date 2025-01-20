package org.example.estivage.dao;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.example.estivage.entity.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@ApplicationScoped
@Transactional
public class EstivageDaoImpl implements EstivageDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public EstivageCentre createEstivageCentre(EstivageCentre estivageCentre) {
//        em.persist(estivageCentre);
        estivageCentre = em.merge(estivageCentre);
        return estivageCentre;
    }

    @Override
    public void deleteEstivageCentre(Integer id) {
        EstivageCentre centre = em.find(EstivageCentre.class, id);
        if (centre != null) {
            em.remove(centre);
        }
    }

    @Override
    public EstivageCentre getEstivageCentreById(Integer id) {
        return em.find(EstivageCentre.class, id);
    }

    @Override
    public List<EstivageCentre> getAllEstivageCentres() {
        return em.createQuery("SELECT e FROM EstivageCentre e", EstivageCentre.class)
                .getResultList();
    }

    @Override
    public List<EstivageProduit> getAllEstivageProduits(Integer id) {
        EstivageCentre centre = em.find(EstivageCentre.class, id);
        return centre != null ? centre.getEstivageProduits() : null;
    }

    @Override
    public EstivageProduit createEstivageProduit(EstivageProduit produit, EstivageCentre centre) {
        if (!centre.getEstivageProduits().contains(produit)) {
            centre.getEstivageProduits().add(produit);
        }
        produit.setEstivageCentre(centre);
        em.merge(produit);
        return produit;
    }

    @Override
    public void deleteEstivageProduit(Integer id) {
        EstivageProduit produit = em.find(EstivageProduit.class, id);
        if (produit != null) {
            em.remove(produit);
        }
    }

    @Override
    public EstivageProduit getEstivageProduitById(Integer id) {
        return em.find(EstivageProduit.class, id);
    }

    @Override
    public EstivageReservation createEstivageReservation(Integer id, EstivageReservation reservation) {
        EstivageProduit produit = em.find(EstivageProduit.class, id);
        if (produit != null) {
            produit.getEstivageReservations().add(reservation);
            reservation.setEstivageProduit(produit);
            em.merge(reservation);
        }
        return reservation;
    }

    @Override
    public EstivageReservation addDateDeReservation(
            EstivageProduit produit,
            LocalDateTime startDate,
            LocalDateTime endDate,
            User user) {

        EstivageReservation reservation = new EstivageReservation();
        reservation.setEstivageProduit(produit);
        reservation.setDateDeDebut(startDate);
        reservation.setDateDeFin(endDate);
        reservation.setUser(user);

        // Calculate number of nights
        long nightsBetween = ChronoUnit.DAYS.between(
                startDate.toLocalDate(),
                endDate.toLocalDate()
        );
        reservation.setNumberOfNights((int) nightsBetween);

        // Get price per night from the center
        Double pricePerNight = produit.getEstivageCentre().getPricePerNight();
        reservation.setPricePerNight(pricePerNight);

        // Calculate total price
        reservation.setTotalPrice(pricePerNight * nightsBetween);

        em.merge(reservation);
        return reservation;
    }

    @Override
    public User findByUsername(String username) {
        return em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                .setParameter("username", username)
                .getSingleResult();
    }

    @Override
    public EstivageCentre addPhoto(EstivageCentre centre, EstivageCentrePhotos photo) {
        centre.getEstivageCentrePhotos().add(photo);
        photo.setEstivageCentre(centre);
        em.merge(centre);
        return centre;
    }

    @Override
    public EstivageCentre addPhotos(EstivageCentre centre, List<EstivageCentrePhotos> photos) {
        for (EstivageCentrePhotos photo : photos) {
            photo.setEstivageCentre(centre);
            centre.getEstivageCentrePhotos().add(photo);
        }
        em.merge(centre);
        return centre;
    }

    @Override
    public List<EstivageReservation> getEstivageReservationByUsername(User user) {
        return em.createQuery(
                        "SELECT r FROM EstivageReservation r WHERE r.user = :user",
                        EstivageReservation.class)
                .setParameter("user", user)
                .getResultList();
    }
}