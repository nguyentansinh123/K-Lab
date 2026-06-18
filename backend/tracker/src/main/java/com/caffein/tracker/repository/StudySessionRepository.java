package com.caffein.tracker.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.caffein.tracker.model.StudySession;
import com.caffein.tracker.model.User;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, String> {

    @EntityGraph(attributePaths = { "activities", "user" })
    Optional<StudySession> findByUserAndDate(User user, LocalDate date);

    @EntityGraph(attributePaths = { "activities", "activities.activityPauses", "user" })
    List<StudySession> findAllByUser(User user);

    List<StudySession> findByUserId(String userid);

    List<StudySession> findByUserIdAndDateBetween(
            String userId,
            LocalDate dateStart,
            LocalDate dateEnd);

}
