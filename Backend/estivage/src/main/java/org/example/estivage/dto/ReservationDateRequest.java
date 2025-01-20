package org.example.estivage.dto;

import java.time.LocalDateTime;

public class ReservationDateRequest {
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    // Getters and Setters
    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }
}