package com.caffein.tracker.re.request.activity;

import lombok.Data;

@Data
public class StopActivityRequest {
    private Boolean paperMode;
    private Integer totalSamples;
    private Integer faceDetectedSamples;
    private Double averageYawDegrees;
    private Double averagePitchDegrees;
}
