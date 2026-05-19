package com.caffein.tracker.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.User;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, String>{
    List<Activity> findByUserAndDate(User user, LocalDate date);
}
