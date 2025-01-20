import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import "./about.css";
import Navbar from "../../components/NavbarPers";
import { JPA_API_URL } from "../../Constants";
import HeaderAuth from "../../components/layout/headers/HeaderAuth";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: "2rem auto",
  maxWidth: "85%",
  borderRadius: "10px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  overflow: "hidden",
  backgroundColor: "#ffffff",
  position: "relative", // Add position relative
  zIndex: 1, // Lower z-index than header
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 700,
  borderCollapse: "separate",
  borderSpacing: "0 4px",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "0.9rem",
  padding: "12px 16px",
  backgroundColor: "#ffffff",
  color: "#344767",
  borderBottom: "1px solid #f0f2f5",
  "&:first-of-type": {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  },
  "&:last-of-type": {
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#f8fafc",
    transform: "translateY(-1px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  "& td": {
    backgroundColor: "transparent",
    borderBottom: "none",
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: "6px",
  fontWeight: 500,
  padding: "0 8px",
  backgroundColor: "#e8f5e9",
  color: "#2e7d32",
  border: "none",
}));

const PageContainer = styled("div")({
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
  paddingTop: "100px", // Increased padding-top to prevent header overlap
  paddingBottom: "40px",
  position: "relative", // Add position relative
  zIndex: 0, // Lower z-index than header
});

const Reservations = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  const { data: user, loading: loadingUser } = useFetch(
    `${JPA_API_URL}/estivage/classe/${username}`
  );
  const { data, loading } = useFetch(
    `${JPA_API_URL}/estivageReservations/user/${username}`
  );

  const montant = (classe) => {
    switch (classe) {
      case "A":
        return 2000;
      case "B":
        return 4000;
      case "C":
        return 6000;
      case "D":
        return 8000;
      default:
        return 0;
    }
  };

  if (loading || loadingUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        <HeaderAuth />
        <PageContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Aucune réservation trouvée
            </Typography>
          </Box>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <HeaderAuth />
      <PageContainer>
        <StyledTableContainer component={Paper}>
          <Typography
            variant="h5"
            sx={{
              padding: "20px 24px",
              fontWeight: 600,
              color: "#344767",
              borderBottom: "1px solid #f0f2f5",
            }}
          >
            Mes Réservations
          </Typography>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>N° Réservation</StyledTableCell>
                <StyledTableCell>Centre</StyledTableCell>
                <StyledTableCell>Produit</StyledTableCell>
                <StyledTableCell>Date de début</StyledTableCell>
                <StyledTableCell>Date de fin</StyledTableCell>
                <StyledTableCell>Prix par nuit</StyledTableCell>
                <StyledTableCell>Nombre de nuits</StyledTableCell>
                <StyledTableCell>Montant total</StyledTableCell>
                <StyledTableCell>Statut</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    #{row.id.toString().padStart(4, "0")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.estivageProduit.estivageCentre.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.estivageProduit.title}</StyledTableCell>
                  <StyledTableCell>
                    {new Date(row.dateDeDebut).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {new Date(row.dateDeFin).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography sx={{ fontWeight: 600, color: "#2c3e50" }}>
                      {row.pricePerNight} EUROS
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography sx={{ color: "#2c3e50" }}>
                      {row.numberOfNights} nuits
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography sx={{ fontWeight: 600, color: "#2c3e50" }}>
                      {row.totalPrice} EUROS
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StatusChip
                      label="Réservé"
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </PageContainer>
    </>
  );
};

export default Reservations;
