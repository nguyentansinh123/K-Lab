package com.caffein.tracker.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class StudySessionDTO {
    private UserDTO user;

    private LocalDate date;

    private List<ActivityDTO> activities;

    private Long totalDurationSeconds;

    private String note;
}
