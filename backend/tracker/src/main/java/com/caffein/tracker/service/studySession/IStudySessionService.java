package com.caffein.tracker.service.studySession;

import java.time.LocalDate;
import java.util.List;

import com.caffein.tracker.model.StudySession;
import com.caffein.tracker.model.User;
import com.caffein.tracker.re.request.ssession.StudySessionByDateRequest;

public interface IStudySessionService {

    StudySession getOrCreateTodaySession(User user);
    StudySession getSession(User user, StudySessionByDateRequest date);
    List<StudySession> getSessionBetween(String userId, LocalDate dateStart, LocalDate dateEnd);
    Long calculateTotalDurationSeconds(StudySession studySession);
    void refreshTotalDuration(StudySession studySession);
    
}
