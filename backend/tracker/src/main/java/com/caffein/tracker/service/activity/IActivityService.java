package com.caffein.tracker.service.activity;

import java.time.LocalDate;
import java.util.List;

import com.caffein.tracker.model.Activity;
import com.caffein.tracker.model.User;

public interface IActivityService {

    Activity startActivity(User user, String title, String appName, String topic);

    Activity stopCurrentActivity(User user);

    Activity getCurrentActivity(User user);
    
    List<Activity> getTodayActivities(User user);

    List<Activity> getActivitiesByDate(User user, LocalDate date);
    
    Activity updateActivity(User user, String activityId, String title, String appName, String topic);

    void deleteActivity(User user, String activityId);
}
