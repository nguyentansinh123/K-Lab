package com.caffein.tracker.service.studySession;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.caffein.tracker.dto.StudySessionDTO;
import com.caffein.tracker.exception.AppException;
import com.caffein.tracker.exception.ErrorCode;
import com.caffein.tracker.mapper.StudySessionMapper;
import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.StudySession;
import com.caffein.tracker.model.User;
import com.caffein.tracker.repository.StudySessionRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudySessionService implements IStudySessionService {

    private final StudySessionRepository studySessionRepository;
    private final StudySessionMapper studySessionMapper;

    @Override
    public StudySession getOrCreateTodaySession(User user) {

        LocalDate date = LocalDate.now();

        Optional<StudySession> checkSess = studySessionRepository.findByUserAndDate(user, date);
        if (checkSess.isPresent()) {
            return checkSess.get();
        } else {

            StudySession sess = StudySession
                    .builder()
                    .user(user)
                    .date(date)
                    .totalDurationSeconds(0L)
                    .build();

            StudySession myStudySS = studySessionRepository.save(sess);

            return myStudySS;
        }

    }

    @Override
    public StudySession getSession(User user, LocalDate date) {
        return studySessionRepository.findByUserAndDate(user, date)
                .orElseThrow(() -> new AppException(ErrorCode.STUDY_SESSION_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<StudySessionDTO> getSessionBetweenDTO(
            String userId,
            LocalDate dateStart,
            LocalDate dateEnd) {
        List<StudySession> sessions = studySessionRepository.findByUserIdAndDateBetween(userId, dateStart, dateEnd);

        return sessions.stream()
                .map(studySessionMapper::toDTO)
                .toList();
    }

    @Override
    public Long calculateTotalDurationSeconds(StudySession studySession) {
        List<Activity> activities = studySession.getActivities();

        return activities.stream().mapToLong(act -> {
            return Long.parseLong(act.getDuration());
        }).sum();
    }

    @Override
    public void refreshTotalDuration(StudySession studySession) {
        Long updateDuration = calculateTotalDurationSeconds(studySession);
        studySession.setTotalDurationSeconds(updateDuration);
        studySessionRepository.save(studySession);
    }

}
