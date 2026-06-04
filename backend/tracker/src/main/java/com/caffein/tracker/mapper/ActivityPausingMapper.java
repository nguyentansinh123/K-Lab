package com.caffein.tracker.mapper;

import org.springframework.stereotype.Component;

import com.caffein.tracker.dto.ActivityPauseDTO;
import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.ActivityPause;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ActivityPausingMapper {

    public ActivityPauseDTO toDTO(ActivityPause pause) {
        return ActivityPauseDTO.builder()
                .id(pause.getId())
                .pauseTimeStart(pause.getPauseTimeStart())
                .pauseTimeEnd(pause.getPauseTimeEnd())
                .status(pause.getCurrentStatus())
                .build();
    }

    public ActivityPause toEntity(ActivityPauseDTO pauseDTO) {
        return toEntity(pauseDTO, null);
    }

    public ActivityPause toEntity(ActivityPauseDTO pauseDTO, Activity activity) {
        return ActivityPause.builder()
                .id(pauseDTO.getId())
                .pauseTimeStart(pauseDTO.getPauseTimeStart())
                .pauseTimeEnd(pauseDTO.getPauseTimeEnd())
                .currentStatus(pauseDTO.getStatus())
                .activity(activity)
                .build();
    }
}
