package com.caffein.tracker.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.caffein.tracker.dto.ActivityDTO;
import com.caffein.tracker.dto.ActivityPauseDTO;
import com.caffein.tracker.mapper.ActivityMapper;
import com.caffein.tracker.mapper.ActivityPausingMapper;
import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.User;
import com.caffein.tracker.model.type.PStatus;
import com.caffein.tracker.re.request.activity.StartActivityRequest;
import com.caffein.tracker.service.ActivityPause.IActivityPauseService;
import com.caffein.tracker.service.activity.IActivityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/activity")
@RequiredArgsConstructor
public class ActivityController {
    private final IActivityService activityService;
    private final ActivityMapper activityMapper;
    private final IActivityPauseService activityPauseService;

    @PostMapping("/startActivity")
    public ResponseEntity<ActivityDTO> startActivity(
            @RequestBody StartActivityRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Activity activity = activityService.startActivity(user, request.getTitle(), request.getAppName(),
                request.getTopic());

        return ResponseEntity.ok(activityMapper.toDTO(activity));
    }

    @PostMapping("/stopActivity")
    public ResponseEntity<ActivityDTO> stopActivity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Activity activity = activityService.stopCurrentActivity(user);

        return ResponseEntity.ok(activityMapper.toDTO(activity));
    }

    @GetMapping("/getCurrentActivity")
    public ResponseEntity<ActivityDTO> getCurrentActivity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Activity activity = activityService.getCurrentActivity(user);

        return ResponseEntity.ok(activityMapper.toDTO(activity));
    }

    @GetMapping("/getTodaysActivity")
    public ResponseEntity<List<ActivityDTO>> getTodaysActivity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        List<Activity> activities = activityService.getTodayActivities(user);

        return ResponseEntity.ok(
                activities.stream().map(act -> {
                    return activityMapper.toDTO(act);
                }).toList()

        );
    }
    
    @PostMapping("/startPausing")
    public ResponseEntity<Map<String, String>> startPausingActivity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Activity activity = activityService.getCurrentActivity(user);
        
        activityPauseService.startPausing(activity);
        
        return ResponseEntity.ok(Map.of("message", "This activity has been paused"));
    }
    
    
    @PostMapping("/stopPausing")
    public ResponseEntity<Map<String, String>> stopPausingActivity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Activity activity = activityService.getCurrentActivity(user);
        
        activityPauseService.stopPausing(activity);
        
        return ResponseEntity.ok(Map.of("message", "This activity has been unpaused"));
    }

    @GetMapping("/latestPausingType")
    public ResponseEntity<ActivityDTO> LatestPausingActivity(@RequestParam PStatus status) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Activity activity = activityService.getCurrentActivity(user);
        
        ActivityPauseDTO pausingAc = activityPauseService.getCurrentLatestPausing(activity, status);
        
        ActivityDTO res = activityMapper.toDTO(activity);
        res.setActivityPauses(List.of(pausingAc));
        return ResponseEntity.ok(res);
        
    }

}
