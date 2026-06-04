package com.caffein.tracker.service.ActivityPause;

import com.caffein.tracker.dto.ActivityPauseDTO;
import com.caffein.tracker.model.Activity;

public interface IActivityPauseService {
    
    ActivityPauseDTO startPausing (Activity activity);

    ActivityPauseDTO stopPausing (Activity activity);
    
    ActivityPauseDTO getCurrentStartPausing();
    
    ActivityPauseDTO getCurrentStopPausing();
} 