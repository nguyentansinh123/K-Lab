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

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
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
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        String oldUrl = user.getImgUrl();

        try {
            File convFile = new File(
                    System.getProperty("java.io.tmpdir") +
                            "/" +
                            imageUrl.getOriginalFilename());
            FileOutputStream fos = new FileOutputStream(convFile);
            fos.write(imageUrl.getBytes());
            fos.close();

            var pic = cloudinary
                    .uploader()
                    .upload(convFile, ObjectUtils.asMap("folder", "/userAva/"));

            user.setImgUrl(pic.get("url").toString());

            User saved = userRepository.save(user);

            if (oldUrl != null && oldUrl.contains("res.cloudinary.com")) {
                String publicId = extractPublicId(oldUrl);
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            }
            return saved;
        } catch (Exception e) {
            throw new AppException(ErrorCode.IMAGE_UPLOAD_FAILED);
        }
    }

    private String extractPublicId(String url) {
        int uploadIdx = url.indexOf("/upload/");
        String afterUpload = url.substring(uploadIdx + "/upload/".length());
        if (afterUpload.startsWith("v")) {
            afterUpload = afterUpload.substring(afterUpload.indexOf('/') + 1); // strip v123/
        }
        int dot = afterUpload.lastIndexOf('.');
        return dot > 0 ? afterUpload.substring(0, dot) : afterUpload;
    }

    @Transactional
    @Override
    public User findOrCreateUserLoginByGoogle(String name, String email, String imageUrl) {
        Optional<User> user = userRepository.findByEmailIgnoreCase(email);
        if (!user.isPresent()) {
            // Create User
            String[] parts = name.trim().split("\\s", 2);
            String firstName = parts[0];
            String lastName = parts.length > 1 ? parts[1] : "";

            CreateGoogleUser req = CreateGoogleUser.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .email(email)
                    .imageUrl(imageUrl)
                    .build();

            User createdUser = userMapper.toUserWithGoogle(req);
            User mySaveUser = userRepository.save(createdUser);
            return mySaveUser;
        }

        // already in database
        return user.get();
    }

}
