package org.example.estivage.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="estivage_centre_photos")
public class EstivageCentrePhotos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="estivage_centre_id")
    @JsonIgnore
    private EstivageCentre estivageCentre;

    private String photo;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EstivageCentre getEstivageCentre() {
        return estivageCentre;
    }

    public void setEstivageCentre(EstivageCentre estivageCentre) {
        this.estivageCentre = estivageCentre;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
