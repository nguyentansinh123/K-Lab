package com.caffein.tracker.repository;

import java.time.LocalDate;
import java.util.List;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.User;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, String>{
    List<Activity> findByStudySessionUserAndStudySessionDate(User user, LocalDate date);
    Optional<Activity> findFirstByStudySessionUserIdAndActivityEndAtIsNull(String userId);
}
