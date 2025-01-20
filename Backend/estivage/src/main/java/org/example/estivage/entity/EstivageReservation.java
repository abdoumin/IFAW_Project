package org.example.estivage.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "estivage_reservation")
public class EstivageReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime dateDeDebut;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime dateDeFin;

    @Column(nullable = false)
    private Integer numberOfNights;

    @Column(nullable = false)
    private Double pricePerNight;

    @Column(nullable = false)
    private Double totalPrice;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "estivage_produit_id")
    private EstivageProduit estivageProduit;

    @ManyToOne
    @JoinColumn(name = "user_id")  // Changed from estivage_reservation_user
    private User user;  // Changed from UserDao to User

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDateDeDebut() {
        return dateDeDebut;
    }

    public void setDateDeDebut(LocalDateTime dateDeDebut) {
        this.dateDeDebut = dateDeDebut;
    }

    public LocalDateTime getDateDeFin() {
        return dateDeFin;
    }

    public void setDateDeFin(LocalDateTime dateDeFin) {
        this.dateDeFin = dateDeFin;
    }

    public Integer getNumberOfNights() {
        return numberOfNights;
    }

    public void setNumberOfNights(Integer numberOfNights) {
        this.numberOfNights = numberOfNights;
    }

    public Double getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(Double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public EstivageProduit getEstivageProduit() {
        return estivageProduit;
    }

    public void setEstivageProduit(EstivageProduit estivageProduit) {
        this.estivageProduit = estivageProduit;
    }

    public User getUser() {  // Changed from getUserDao
        return user;
    }

    public void setUser(User user) {  // Changed from setUserDao
        this.user = user;
    }
}