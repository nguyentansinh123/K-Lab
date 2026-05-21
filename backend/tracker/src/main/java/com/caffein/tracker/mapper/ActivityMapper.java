package com.caffein.tracker.mapper;

import org.springframework.stereotype.Component;

import com.caffein.tracker.dto.ActivityDTO;
import com.caffein.tracker.model.Activity;

@Component
public class ActivityMapper {
    public ActivityDTO toDTO(Activity activity){
        return ActivityDTO.builder()
        .title(activity.getTitle())
        .appName(activity.getAppName())
        .activityStartAt(activity.getActivityStartAt())
        .activityEndAt(activity.getActivityEndAt())
        .topic(activity.getTopic())
        .duration(activity.getDuration())
        .build();

    }
}
