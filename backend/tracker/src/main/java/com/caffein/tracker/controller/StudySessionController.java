package com.caffein.tracker.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.caffein.tracker.dto.StudySessionDTO;
import com.caffein.tracker.mapper.StudySessionMapper;
import com.caffein.tracker.model.StudySession;
import com.caffein.tracker.model.User;
import com.caffein.tracker.re.request.ssession.StudySessionDateRangeRequest;
import com.caffein.tracker.service.studySession.IStudySessionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/ssession")
@RequiredArgsConstructor
public class StudySessionController {

    private final IStudySessionService studySessionService;
    private final StudySessionMapper studySessionMapper;

    @PostMapping("/createTodaySession")
    public ResponseEntity<StudySessionDTO> createTodaySession() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        StudySession ss = studySessionService.getOrCreateTodaySession(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(studySessionMapper.toDTO(ss));
    }

    @GetMapping("/session/byDate")
    public ResponseEntity<StudySessionDTO> getSessionByDate(@RequestParam LocalDate date) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        StudySession session = studySessionService.getSession(user, date);
        return ResponseEntity.ok(studySessionMapper.toDTO(session));
    }

    @GetMapping("/session/from-to")
    public ResponseEntity<List<StudySessionDTO>> getSessionByDate(@RequestBody StudySessionDateRangeRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        String userId = user.getId();

        List<StudySession> sessions = studySessionService.getSessionBetween(userId, request.getDateStart(), request.getDateEnd());

        return ResponseEntity.ok(
                sessions.stream().map(session -> {
                    return studySessionMapper.toDTO(session);
                }).toList());
    }

    @PutMapping("/refreshTodayTotalDuration")
    public ResponseEntity<StudySessionDTO> refreshTodayTotalDuration() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        StudySession session = studySessionService.getOrCreateTodaySession(user);

        studySessionService.refreshTotalDuration(session);

        return ResponseEntity.ok(studySessionMapper.toDTO(session));
    }
}
