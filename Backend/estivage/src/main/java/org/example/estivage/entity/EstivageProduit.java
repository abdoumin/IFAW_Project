package org.example.estivage.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "estivage_produit")
public class EstivageProduit {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title, des;

    private Integer max_people;

    @JsonIgnore
    @OneToMany(mappedBy = "estivageProduit",cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<EstivageReservation> estivageReservations;


    public List<EstivageReservation> getEstivageReservations() {
        return estivageReservations;
    }

    public void setEstivageReservations(List<EstivageReservation> estivageReservations) {
        this.estivageReservations = estivageReservations;
    }

    @JsonIgnoreProperties("estivageProduits")
    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "estivage_centre_id")
    private EstivageCentre estivageCentre;



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public Integer getMax_people() {
        return max_people;
    }

    public void setMax_people(Integer max_people) {
        this.max_people = max_people;
    }

    public EstivageCentre getEstivageCentre() {
        return estivageCentre;
    }

    public void setEstivageCentre(EstivageCentre estivageCentre) {
        this.estivageCentre = estivageCentre;
    }


    public EstivageProduit() {
    }

    public EstivageProduit(String title, String des, Integer max_people) {
        this.title = title;
        this.des = des;
        this.max_people = max_people;
    }
}