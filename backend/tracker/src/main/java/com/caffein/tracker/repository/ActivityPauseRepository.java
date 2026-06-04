package com.caffein.tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.caffein.tracker.model.ActivityPause;

@Repository
public interface ActivityPauseRepository extends JpaRepository<ActivityPause, String>{
    
}
