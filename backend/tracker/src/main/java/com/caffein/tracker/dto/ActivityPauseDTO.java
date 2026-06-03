package com.caffein.tracker.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActivityPauseDTO {
    private String id;
    private String pauseTimeStart;
    private String pauseTimeEnd;
}