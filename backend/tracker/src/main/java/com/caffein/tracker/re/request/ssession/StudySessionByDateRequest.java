package com.caffein.tracker.re.request.ssession;

import java.time.LocalDate;

import lombok.Data;

@Data
public class StudySessionByDateRequest {
    private LocalDate date;
}