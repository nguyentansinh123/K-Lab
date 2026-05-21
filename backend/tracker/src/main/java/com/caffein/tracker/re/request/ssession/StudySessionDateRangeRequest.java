package com.caffein.tracker.re.request.ssession;

import java.time.LocalDate;

import lombok.Data;

@Data
public class StudySessionDateRangeRequest {
    private LocalDate dateStart;
    private LocalDate dateEnd;
}
