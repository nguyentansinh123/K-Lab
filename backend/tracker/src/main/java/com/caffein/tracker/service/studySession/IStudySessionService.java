package com.caffein.tracker.service.studySession;

import java.time.LocalDate;
import java.util.List;

import com.caffein.tracker.dto.StudySessionDTO;
import com.caffein.tracker.model.StudySession;
import com.caffein.tracker.model.User;

public interface IStudySessionService {

    StudySession getOrCreateTodaySession(User user);
    StudySession getSession(User user, LocalDate date);
    List<StudySessionDTO> getSessionBetweenDTO(String userId, LocalDate dateStart, LocalDate dateEnd);
    Long calculateTotalDurationSeconds(StudySession studySession);
    StudySessionDTO refreshTotalDuration(StudySession studySession);
    Long calculateTotalDurationInPeriod(int days, String userId);
    List<Long> compareThisMonthTTHrAndLast(String userId);
    Long calculateCurrentStreak(User user);
    Long calculateLongestStreak(User user);
    
}
