package com.caffein.tracker.re.request.auth.google;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateGoogleUser {
    private String firstName;
    private String lastName;
    private String email;
    private String imageUrl;
    private boolean emailVerified;
}
