package com.caffein.tracker.service.ActivityPause;

import com.caffein.tracker.dto.ActivityPauseDTO;
import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.type.PStatus;

public interface IActivityPauseService {
    
    ActivityPauseDTO startPausing (Activity activity);

    ActivityPauseDTO stopPausing (Activity activity);
    
    ActivityPauseDTO getCurrentLatestPausing(Activity activity, PStatus status);
    
    ActivityPauseDTO findPauseByStatus(String activityId, PStatus status);
    
} 