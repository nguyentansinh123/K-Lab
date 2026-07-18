package com.caffein.tracker.re.request.auth.google;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoogleCodeExchangeRequest {

    @NotBlank(message = "Google login code is required")
    private String code;
}
