package com.caffein.tracker.service.user;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import com.caffein.tracker.model.User;

public interface IUserService extends UserDetailsService {

    Optional<User> findById(String id);

    boolean existsByEmail(String email);

    List<User> getAllUser();

    User addImageUrl(MultipartFile imageUrl);

}
