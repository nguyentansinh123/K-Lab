package com.caffein.tracker.re.request.activity;

import lombok.Data;

@Data
public class StartActivityRequest {
    private String title;
    private String appName;
    private String topic;
}
