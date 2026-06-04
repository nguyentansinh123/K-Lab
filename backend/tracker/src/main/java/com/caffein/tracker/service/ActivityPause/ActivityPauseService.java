package com.caffein.tracker.service.ActivityPause;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.caffein.tracker.dto.ActivityPauseDTO;
import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.ActivityPause;
import com.caffein.tracker.model.User;
import com.caffein.tracker.model.type.PStatus;
import com.caffein.tracker.repository.ActivityPauseRepository;
import com.caffein.tracker.repository.ActivityRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityPauseService implements IActivityPauseService {

    private final ActivityPauseRepository activityPauseRepository;
    private final ActivityRepository activityRepository;

    @Transactional
    @Override
    public ActivityPauseDTO startPausing(Activity activity) {
        List<ActivityPause> pauses = activity.getActivityPauses();

        if (pauses == null) {
            pauses = new ArrayList<>();
            activity.setActivityPauses(pauses);
        }

        String currentTime = LocalDateTime.now().toString();

        ActivityPause activityPause = ActivityPause
                .builder()
                .pauseTimeStart(currentTime)
                .pauseTimeEnd(null)
                .currentStatus(PStatus.PAUSE)
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

    @Override
    public ActivityPauseDTO stopPausing(Activity activity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'stopPausing'");
    }

}
