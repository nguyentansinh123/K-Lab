package com.caffein.tracker.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActivityDTO {
    private String title;

    private String appName;

    private String activityStartAt;

    private String activityEndAt; 

    private String topic;

    private String duration;

    private Boolean paperMode;

    private Integer focusScore;

    private Integer trackingSamples;

    private Integer faceDetectedSamples;

    private Double averageYawDegrees;

    private Double averagePitchDegrees;
    
    private List<ActivityPauseDTO> activityPauses;

}
