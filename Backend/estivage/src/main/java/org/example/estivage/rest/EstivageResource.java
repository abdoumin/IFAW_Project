package org.example.estivage.rest;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.estivage.dao.EstivageDao;
import org.example.estivage.dto.ReservationDateRequest;
import org.example.estivage.entity.*;

import java.util.List;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EstivageResource {

    @Inject
    private EstivageDao estivageDao;

    // CREATE ESTIVAGE CENTRE
    @POST
    @Path("/estivagecentre/create")
    public Response createEstivageCentre(EstivageCentre estivageCentre) {
        EstivageCentre created = estivageDao.createEstivageCentre(estivageCentre);
        return Response.ok(created).build();
    }

    @GET
    @Path("/estivage/classe/{username}")
    public Response getUser(@PathParam("username") String username) {
        User user = estivageDao.findByUsername(username);
        return Response.ok(user).build();
    }

    // GET ESTIVAGE CENTRE BY ID
    @GET
    @Path("/estivageCentre/{id}")
    public Response getEstivageCentreById(@PathParam("id") Integer id) {
        EstivageCentre centre = estivageDao.getEstivageCentreById(id);
        return Response.ok(centre).build();
    }

    // CREATE ESTIVAGE PRODUIT
    @POST
    @Path("/estivageProduit/create/{hotelid}")
    public Response createEstivageProduit(
            @PathParam("hotelid") Integer id,
            EstivageProduit estivageProduit) {
        EstivageCentre centre = estivageDao.getEstivageCentreById(id);
        EstivageProduit created = estivageDao.createEstivageProduit(estivageProduit, centre);
        return Response.ok(created).build();
    }

    // Get all Estivage Produits
    @GET
    @Path("/estivageproduit/all/{hotelid}")
    public Response getAllEstivageProduit(@PathParam("hotelid") Integer hotelid) {
        List<EstivageProduit> list = estivageDao.getAllEstivageProduits(hotelid);
        return Response.ok(list).build();
    }

    // Get All Estivage Centre
    @GET
    @Path("/estivagecentre/all")
    public Response getAllEstivageCentre() {
        List<EstivageCentre> centres = estivageDao.getAllEstivageCentres();
        return Response.ok(centres).build();
    }

    // UPDATE Estivage Centre
    @PUT
    @Path("/estivagecentre/update/{hotelId}")
    public Response updateEstivageCentre(
            @PathParam("hotelId") Integer id,
            EstivageCentre newEstivage) {
        EstivageCentre centre = estivageDao.getEstivageCentreById(id);
        if (centre != null) {
            centre.setAdress(newEstivage.getAdress());
            centre.setCity(newEstivage.getCity());
            centre.setDes(newEstivage.getDes());
            centre.setName(newEstivage.getName());
            centre.setPhotos(newEstivage.getPhotos());
            centre.setRating(newEstivage.getRating());
            centre.setTitle(newEstivage.getTitle());
            centre.setType(newEstivage.getType());
            EstivageCentre updated = estivageDao.createEstivageCentre(centre);
            return Response.ok(updated).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    // DELETE Estivage Centre
    @DELETE
    @Path("/estivagecentre/delete/{hotelId}")
    public Response deleteEstivageCentre(@PathParam("hotelId") Integer id) {
        estivageDao.deleteEstivageCentre(id);
        return Response.ok().build();
    }

    // CREATE ESTIVAGE RESERVATION
    @POST
    @Path("/estivagereservation/create/{produitId}")
    public Response createEstivageReservation(
            @PathParam("produitId") Integer id,
            EstivageReservation reservation) {
        EstivageReservation created = estivageDao.createEstivageReservation(id, reservation);
        return Response.ok(created).build();
    }

    @POST
    @Path("estivageProduit/{estivageId}/reserve/{username}") // Corresponds to /estivageProduit/{estivageId}/reserve/{username}
    public EstivageReservation addEstivageReservationDate(
            @PathParam("estivageId") Integer id, // Path parameter for estivageId
            @PathParam("username") String username, // Path parameter for username
            ReservationDateRequest dateRequest // JSON body parsed into this object
    ) {
        // Find the EstivageProduit by ID
        EstivageProduit estivageProduit = estivageDao.getEstivageProduitById(id);
        if (estivageProduit == null) {
            throw new WebApplicationException("EstivageProduit not found for id: " + id, 404);
        }

        // Find the User by username
        User user = estivageDao.findByUsername(username);
        if (user == null) {
            throw new WebApplicationException("User not found for username: " + username, 404);
        }

        // Add the reservation using DAO
        return estivageDao.addDateDeReservation(
                estivageProduit,
                dateRequest.getStartDate(),
                dateRequest.getEndDate(),
                user
        );
    }


    // GET Reservation dates by estivage produit
    @GET
    @Path("/estivageProduit/{estivageproduitId}/get/reservations")
    public Response getEtivageReservations(@PathParam("estivageproduitId") Integer id) {
        EstivageProduit produit = estivageDao.getEstivageProduitById(id);
        if (produit != null) {
            return Response.ok(produit.getEstivageReservations()).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    // ADD ESTIVAGE PHOTOS
    @POST
    @Path("/estivageCentre/{id}/add/estivagePhotos")
    public Response addEstivagePhotos(
            @PathParam("id") Integer id,
            List<EstivageCentrePhotos> photos) {
        EstivageCentre centre = estivageDao.getEstivageCentreById(id);
        if (centre != null) {
            EstivageCentre updated = estivageDao.addPhotos(centre, photos);
            return Response.ok(updated).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @GET
    @Path("/estivageReservations/user/{username}")
    public Response getEstivageReservationByUsername(@PathParam("username") String username) {
        User user = estivageDao.findByUsername(username);
        if (user != null) {
            List<EstivageReservation> reservations = estivageDao.getEstivageReservationByUsername(user);
            return Response.ok(reservations).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}