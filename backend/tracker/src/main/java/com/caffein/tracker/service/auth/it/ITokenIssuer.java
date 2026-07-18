package com.caffein.tracker.service.auth.it;

import com.caffein.tracker.model.User;
import com.caffein.tracker.re.response.LoginResponse;

public interface ITokenIssuer {

    LoginResponse issueToken(User user);
    
} 