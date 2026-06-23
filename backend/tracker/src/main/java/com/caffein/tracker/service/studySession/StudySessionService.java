package com.caffein.tracker.service.studySession;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties.Apiversion.Use;
import org.springframework.cglib.core.Local;
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
    private final StudySessionMapper sessionMapper;

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

    @Transactional
    @Override
    public StudySessionDTO refreshTotalDuration(StudySession studySession) {
        Long updateDuration = calculateTotalDurationSeconds(studySession);
        studySession.setTotalDurationSeconds(updateDuration);
        StudySession mySession = studySessionRepository.save(studySession);
        return sessionMapper.toDTO(mySession);
    }

    @Override
    public Long calculateTotalDurationInPeriod(int days, String userId) {
        List<StudySession> ss = studySessionRepository.findByUserId(userId);
        ss.sort((b, a) -> a.getDate().compareTo(b.getDate()));
        Long t = ss.stream()
                .limit(days)
                .map(obj -> obj.getTotalDurationSeconds())
                .reduce(0L, (a, b) -> a + b);

        return t;
    }

    @Override
    public List<Long> compareThisMonthTTHrAndLast(String userId) {
        YearMonth currMonth = YearMonth.now();
        YearMonth monthBefore = currMonth.minusMonths(1);

        List<StudySession> ss = studySessionRepository.findByUserId(userId);
        Long thisMonth = ss.stream()
                .filter(obj -> YearMonth.from(obj.getDate()).equals(currMonth))
                .limit(30)
                .map(obj -> obj.getTotalDurationSeconds())
                .reduce(0L, (a, b) -> a + b);

        Long prevMonth = ss.stream()
                .filter(obj -> YearMonth.from(obj.getDate()).equals(monthBefore))
                .limit(60)
                .map(obj -> obj.getTotalDurationSeconds())
                .reduce(0L, (a, b) -> a + b);

        return List.of(thisMonth, prevMonth);

    }

    // I want 2 days to be count as 1 streak thats what s right if u dont agree then fk u bitch
    @Override
    public Long calculateCurrentStreak(User user) {
        List<StudySession> sessions = studySessionRepository.findAllByUser(user);

        List<LocalDate> dates = sessions.stream()
                .filter(s -> s.getTotalDurationSeconds() > 600)
                .sorted(Comparator.comparing(StudySession::getDate).reversed())
                .map(s -> s.getDate()).toList();
        
        if(dates.isEmpty()){
            return 0L;
        }

        if (!dates.get(0).equals(LocalDate.now())) {
            return 0L;
        }
        LocalDate now = LocalDate.now();
        int streak = 0;
        for (int i = 1; i < dates.size(); i++) {
            if (now.minusDays(1).equals(dates.get(i))) {
                streak++;
                now = dates.get(i);
            } else {
                break;
            }
        }
        return (long) streak;

    }

    @Override
    public Long calculateLongestStreak(User user) {
        List<StudySession> sessions = studySessionRepository.findAllByUser(user);

        List<LocalDate> dates = sessions.stream()
                .filter(s -> s.getTotalDurationSeconds() > 600)
                .sorted(Comparator.comparing(StudySession::getDate))
                .map(s -> s.getDate()).toList();
        
        if(dates.isEmpty()){
            return 0L;
        }
        Long maxStreak = 0L;
        Long currC = 0L;
        
        LocalDate fDate = dates.get(0);

        for (int i = 1; i < dates.size(); i ++){
            if (fDate.plusDays(1).equals(dates.get(i))){
                currC ++;
                fDate = dates.get(i);
            }else{
                currC = 0L;
                fDate = dates.get(i);
            }
            maxStreak = Math.max(maxStreak, currC);

        }

        return maxStreak;
    }

}
