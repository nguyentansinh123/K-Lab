package com.caffein.tracker.dto;

import lombok.Data;

@Data
public class ActivityDTO {
    private String title;

    private String appName;

    private String activityStartAt;

    private String activityEndAt; 

    private String topic;

    private String duration;

    private StudySessionDTO studySession;
}
