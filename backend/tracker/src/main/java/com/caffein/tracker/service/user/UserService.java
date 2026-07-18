package com.caffein.tracker.service.user;

import com.caffein.tracker.dto.UserDTO;
import com.caffein.tracker.exception.AppException;
import com.caffein.tracker.exception.ErrorCode;
import com.caffein.tracker.mapper.UserMapper;
import com.caffein.tracker.model.User;
import com.caffein.tracker.re.request.auth.RegistrationReq;
import com.caffein.tracker.re.request.auth.google.CreateGoogleUser;
import com.caffein.tracker.repository.UserRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private static final long MAX_AVATAR_BYTES = 5L * 1024L * 1024L;

    private final UserRepository userRepository;
    private final Cloudinary cloudinary;
    private final UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
    }

    @Override
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmailIgnoreCase(email);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User addImageUrl(MultipartFile imageUrl) {
        String contentType = imageUrl.getContentType();
        if (imageUrl.isEmpty()
                || imageUrl.getSize() > MAX_AVATAR_BYTES
                || contentType == null
                || !List.of("image/jpeg", "image/png", "image/webp").contains(contentType)) {
            throw new AppException(ErrorCode.INVALID_IMAGE);
        }

        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        try {
            Map<?, ?> picture = cloudinary.uploader().upload(
                    imageUrl.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "userAva",
                            "public_id", user.getId(),
                            "overwrite", true,
                            "invalidate", true,
                            "resource_type", "image"));

            Object secureUrl = picture.get("secure_url");
            if (secureUrl == null) {
                throw new IllegalStateException("Cloudinary did not return a secure URL");
            }

            user.setImgUrl(secureUrl.toString());
            return userRepository.save(user);
        } catch (Exception e) {
            throw new AppException(ErrorCode.IMAGE_UPLOAD_FAILED);
        }
    }

    @Transactional
    @Override
    public User findOrCreateUserLoginByGoogle(
            String name,
            String email,
            String imageUrl,
            boolean emailVerified) {
        Optional<User> user = userRepository.findByEmailIgnoreCase(email);
        if (user.isPresent()) {
            User existingUser = user.get();
            if (emailVerified && !Boolean.TRUE.equals(existingUser.getEmailVerified())) {
                existingUser.setEmailVerified(true);
                return userRepository.save(existingUser);
            }
            return existingUser;
        }

        String safeName = name == null ? "" : name.trim();
        String firstName;
        String lastName;

        if (safeName.isBlank()) {
            int atIndex = email.indexOf('@');
            firstName = atIndex > 0 ? email.substring(0, atIndex) : "Google User";
            lastName = "";
        } else {
            String[] parts = safeName.split("\\s+", 2);
            firstName = parts[0];
            lastName = parts.length > 1 ? parts[1] : "";
        }

        CreateGoogleUser request = CreateGoogleUser.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .imageUrl(imageUrl)
                .emailVerified(emailVerified)
                .build();

        return userRepository.save(userMapper.toUserWithGoogle(request));
    }

}
