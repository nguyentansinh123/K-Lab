package com.caffein.tracker.re.response.ssession;

import java.time.LocalDate;
import java.util.List;

import com.caffein.tracker.dto.ActivityDTO;
import com.caffein.tracker.dto.UserDTO;

import lombok.Data;

@Data
public class StudySessionResponse {
    
    private UserDTO user;

    private LocalDate date;

    private List<ActivityDTO> activities;

    private Long totalDurationSeconds;

    private String note;
}
