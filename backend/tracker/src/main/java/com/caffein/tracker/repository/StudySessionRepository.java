package com.caffein.tracker.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.caffein.tracker.model.StudySession;
import com.caffein.tracker.model.User;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, String>{

    Optional<StudySession> findByUserAndDate(User user, LocalDate date);
    List<StudySession> findByUserId(String userid);
    
}
