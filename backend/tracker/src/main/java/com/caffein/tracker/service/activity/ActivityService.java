package com.caffein.tracker.service.activity;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.caffein.tracker.exception.AppException;
import com.caffein.tracker.exception.ErrorCode;
import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.StudySession;
import com.caffein.tracker.model.User;
import com.caffein.tracker.repository.ActivityRepository;
import com.caffein.tracker.repository.StudySessionRepository;
import com.caffein.tracker.service.studySession.StudySessionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityService implements IActivityService {

    private final ActivityRepository activityRepository;
    private final StudySessionService studySessionService;
    private final StudySessionRepository studySessionRepository;

    @Override
    public Activity startActivity(User user, String title, String appName, String topic) {
        LocalDateTime startTime = LocalDateTime.now();
        StudySession studySession = studySessionService.getOrCreateTodaySession(user);

        boolean hasOngoingActivity = activityRepository
                .findFirstByStudySessionUserIdAndActivityEndAtIsNull(user.getId())
                .isPresent();

        if (hasOngoingActivity) {
            throw new IllegalStateException("You already have an ongoing activity");
        }

        return activityRepository.save(Activity.builder()
                .title(title)
                .appName(appName)
                .activityStartAt(String.valueOf(startTime))
                .topic(topic)
                .studySession(studySession)
                .build());
    }

    @Override
    public Activity stopCurrentActivity(User user) {
        LocalDateTime endTime = LocalDateTime.now();
        Activity activity = activityRepository
                .findFirstByStudySessionUserIdAndActivityEndAtIsNull(user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.ACTIVITY_NOT_FOUND));

        activity.setActivityEndAt(String.valueOf(endTime));
        Duration durations = Duration.between(LocalDateTime.parse(activity.getActivityStartAt()), endTime);
        activity.setDuration(String.valueOf(durations.getSeconds()));

        return activityRepository.save(activity);
    }
    
    
    @Override
    public Activity getCurrentActivity(User user) {
        Activity activity = activityRepository
                .findFirstByStudySessionUserIdAndActivityEndAtIsNull(user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.ACTIVITY_NOT_FOUND));

        return activity;
    }

    @Override
    public List<Activity> getTodayActivities(User user) {
        LocalDate date = LocalDate.now();
        return activityRepository.findByStudySessionUserAndStudySessionDate(user, date);
    }

    @Override
    public List<Activity> getActivitiesByDate(User user, LocalDate date) {
        return activityRepository.findByStudySessionUserAndStudySessionDate(user, date);
    }

    @Override
    public Activity updateActivity(User user, String activityId, String title, String appName, String topic) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateActivity'");
    }

    @Override
    public void deleteActivity(User user, String activityId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteActivity'");
    }


}
