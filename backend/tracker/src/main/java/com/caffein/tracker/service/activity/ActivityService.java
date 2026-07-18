package com.caffein.tracker.service.activity;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.caffein.tracker.exception.AppException;
import com.caffein.tracker.exception.ErrorCode;
import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.ActivityPause;
import com.caffein.tracker.model.StudySession;
import com.caffein.tracker.model.User;
import com.caffein.tracker.repository.ActivityRepository;
import com.caffein.tracker.service.studySession.StudySessionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityService implements IActivityService {

    private final ActivityRepository activityRepository;
    private final StudySessionService studySessionService;

    @Override
    public Activity startActivity(User user, String title, String appName, String topic, boolean paperMode) {
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
                .paperMode(paperMode)
                .studySession(studySession)
                .build());
    }

    @Override
    public Activity stopCurrentActivity(
            User user,
            Boolean paperMode,
            Integer totalSamples,
            Integer faceDetectedSamples,
            Double averageYawDegrees,
            Double averagePitchDegrees) {
        LocalDateTime endTime = LocalDateTime.now();
        Activity activity = activityRepository
                .findFirstByStudySessionUserIdAndActivityEndAtIsNull(user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.ACTIVITY_NOT_FOUND));

        activity.setActivityEndAt(String.valueOf(endTime));
        Duration durations = Duration.between(LocalDateTime.parse(activity.getActivityStartAt()), endTime);
        
        long pauseSeconds = calculateTotalPauseTime(activity);
        long activeSession = durations.getSeconds() - pauseSeconds;

        activity.setDuration(String.valueOf(activeSession));

        boolean effectivePaperMode = paperMode != null
                ? paperMode
                : Boolean.TRUE.equals(activity.getPaperMode());
        int safeTotalSamples = Math.max(0, totalSamples == null ? 0 : totalSamples);
        int safeDetectedSamples = Math.max(
                0,
                Math.min(safeTotalSamples, faceDetectedSamples == null ? 0 : faceDetectedSamples));
        Double safeYaw = isFinite(averageYawDegrees) ? averageYawDegrees : null;
        Double safePitch = isFinite(averagePitchDegrees) ? averagePitchDegrees : null;

        activity.setPaperMode(effectivePaperMode);
        activity.setTrackingSamples(safeTotalSamples);
        activity.setFaceDetectedSamples(safeDetectedSamples);
        activity.setAverageYawDegrees(safeYaw);
        activity.setAveragePitchDegrees(safePitch);
        activity.setFocusScore(calculateFocusScore(
                effectivePaperMode,
                safeTotalSamples,
                safeDetectedSamples,
                safeYaw,
                safePitch));

        return activityRepository.save(activity);
    }

    static Integer calculateFocusScore(
            boolean paperMode,
            int totalSamples,
            int faceDetectedSamples,
            Double averageYawDegrees,
            Double averagePitchDegrees) {
        if (totalSamples <= 0) {
            return null;
        }

        double presence = Math.min(1D, Math.max(0D, (double) faceDetectedSamples / totalSamples));
        if (faceDetectedSamples <= 0 || averageYawDegrees == null || averagePitchDegrees == null) {
            return (int) Math.round(presence * 40D);
        }

        double pitchTarget = paperMode ? 22D : 0D;
        double pitchTolerance = paperMode ? 36D : 24D;
        double pitchValue = paperMode ? Math.abs(averagePitchDegrees) : averagePitchDegrees;
        double yawAlignment = Math.max(0D, 1D - Math.abs(averageYawDegrees) / 35D);
        double pitchAlignment = Math.max(
                0D,
                1D - Math.abs(pitchValue - pitchTarget) / pitchTolerance);

        return (int) Math.round(100D * (presence * 0.4D + yawAlignment * 0.3D + pitchAlignment * 0.3D));
    }

    private static boolean isFinite(Double value) {
        return value != null && Double.isFinite(value);
    }

    private Long calculateTotalPauseTime(Activity activity) {
        List<ActivityPause> pauses = activity.getActivityPauses();
        if (pauses == null) {
            return 0L;
        }

        return pauses.stream()
                .filter(pause -> pause.getPauseTimeStart() != null && pause.getPauseTimeEnd() != null)
                .mapToLong(pause -> {
                    LocalDateTime start = LocalDateTime.parse(pause.getPauseTimeStart());
                    LocalDateTime end = LocalDateTime.parse(pause.getPauseTimeEnd());

                    return Duration.between(start, end).getSeconds();
                }).sum();
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
