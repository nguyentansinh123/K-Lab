package com.caffein.tracker.service.auth;

import com.caffein.tracker.re.request.auth.LoginRequest;
import com.caffein.tracker.re.request.auth.RefreshRequest;
import com.caffein.tracker.re.request.auth.RegistrationReq;
import com.caffein.tracker.re.response.LoginResponse;
import com.caffein.tracker.re.response.RefreshResponse;

public interface IAuthService {

    LoginResponse login(LoginRequest request);

    LoginResponse register(RegistrationReq request);

    RefreshResponse refresh(RefreshRequest request);

}
