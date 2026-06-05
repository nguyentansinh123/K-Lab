package com.caffein.tracker.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.caffein.tracker.model.ActivityPause;
import com.caffein.tracker.model.type.PStatus;

@Repository
public interface ActivityPauseRepository extends JpaRepository<ActivityPause, String>{
    
   Optional<ActivityPause> findTopByActivityIdAndStatusOrderByPauseTimeStartDesc (String activityId,PStatus status); 

}
