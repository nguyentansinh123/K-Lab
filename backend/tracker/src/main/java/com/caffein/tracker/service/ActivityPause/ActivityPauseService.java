package com.caffein.tracker.service.ActivityPause;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.caffein.tracker.dto.ActivityPauseDTO;
import com.caffein.tracker.mapper.ActivityPausingMapper;
import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.ActivityPause;
import com.caffein.tracker.model.type.PStatus;
import com.caffein.tracker.repository.ActivityPauseRepository;
import com.caffein.tracker.repository.ActivityRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityPauseService implements IActivityPauseService {

    private final ActivityRepository activityRepository;
    private final ActivityPauseRepository activityPauseRepository;
    private final ActivityPausingMapper activityPausingMapper;

    @Transactional
    @Override
    public ActivityPauseDTO startPausing(Activity activity) {
        List<ActivityPause> pauses = activity.getActivityPauses();

        if (pauses == null) {
            pauses = new ArrayList<>();
            activity.setActivityPauses(pauses);
        }

        boolean alreadyStarted = pauses.stream().anyMatch((obj) -> {
            return obj.getPauseTimeEnd() == null;
        });
        if (alreadyStarted) {
            throw new IllegalStateException("Activity is already paused");
        }

        String currentTime = LocalDateTime.now().toString();

        ActivityPause activityPause = ActivityPause
                .builder()
                .pauseTimeStart(currentTime)
                .pauseTimeEnd(null)
                .currentStatus(PStatus.PAUSE)
                .activity(activity)
                .build();

        pauses.add(activityPause);
        activityRepository.save(activity);

        return ActivityPauseDTO.builder()
                .id(activityPause.getId())
                .pauseTimeStart(activityPause.getPauseTimeStart())
                .pauseTimeEnd(activityPause.getPauseTimeEnd())
                .status(activityPause.getCurrentStatus())
                .build();

    }

    @Transactional
    @Override
    public ActivityPauseDTO stopPausing(Activity activity) {
        ActivityPause activityPause = activity.getActivityPauses()
                .stream()
                .filter((pause) -> {
                    return pause.getPauseTimeEnd() == null;
                })
                .max(
                        Comparator.comparing(
                                obj -> LocalDateTime.parse(obj.getPauseTimeStart())))
                .orElseThrow(() -> new IllegalStateException("Activity is not currently paused"));
        String currentTime = LocalDateTime.now().toString();
        activityPause.setPauseTimeEnd(currentTime);
        activityPause.setCurrentStatus(PStatus.UNPAUSE);
        activityRepository.save(activity);
        return ActivityPauseDTO.builder()
                .id(activityPause.getId())
                .pauseTimeStart(activityPause.getPauseTimeStart())
                .pauseTimeEnd(activityPause.getPauseTimeEnd())
                .status(activityPause.getCurrentStatus())
                .build();

    }

    @Override
    public ActivityPauseDTO getCurrentLatestPausing(Activity activity, PStatus status) {
        List<ActivityPause> pauses = activity.getActivityPauses();
        if (pauses == null || pauses.isEmpty()) {
            throw new IllegalStateException("Activity is not currently paused");
        }
        ActivityPause pause = pauses.stream().filter((obj) -> obj.getCurrentStatus() == status)
                .max(
                        Comparator.comparing(
                                obj -> LocalDateTime.parse(obj.getPauseTimeStart())))
                .orElseThrow(() -> new IllegalStateException("No pause found"));
        return ActivityPauseDTO.builder()
                .id(pause.getId())
                .pauseTimeStart(pause.getPauseTimeStart())
                .pauseTimeEnd(pause.getPauseTimeEnd())
                .status(pause.getCurrentStatus())
                .build();
    }

    @Override
    public ActivityPauseDTO findPauseByStatus(String activityId, PStatus status) {

        ActivityPause act = activityPauseRepository.findTopByActivityIdAndStatusOrderByPauseTimeStartDesc(activityId, status)
                .orElseThrow(() -> new IllegalStateException("No pause found"));
        
        return activityPausingMapper.toDTO(act);
    }

}
