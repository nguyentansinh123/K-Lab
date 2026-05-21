package com.caffein.tracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.caffein.tracker.model.StudySession;
import com.caffein.tracker.model.User;
import com.caffein.tracker.re.response.ssession.StudySessionResponse;
import com.caffein.tracker.service.studySession.IStudySessionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/ssession")
@RequiredArgsConstructor
public class StudySessionController {

    private final IStudySessionService studySessionService;

    @PostMapping("/createTodaySession")
    public ResponseEntity<StudySessionResponse> createTodaySession () {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        StudySession ss = studySessionService.getOrCreateTodaySession(user);

        return ResponseEntity.ok(new StudySessionResponse());

    }


    
}
