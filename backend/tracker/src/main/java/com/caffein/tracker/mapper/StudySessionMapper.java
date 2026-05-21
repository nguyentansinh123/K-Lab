package com.caffein.tracker.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.caffein.tracker.dto.StudySessionDTO;
import com.caffein.tracker.model.StudySession;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StudySessionMapper {

    private final UserMapper userMapper;
    private final ActivityMapper activityMapper;

    public StudySessionDTO toDTO(StudySession studySession) {

        return StudySessionDTO.builder()
                .user(userMapper.toDto(studySession.getUser()))
                .date(studySession.getDate())
                .activities(
                        studySession.getActivities() == null
                                ? List.of()
                                : studySession.getActivities().stream().map(act -> {
                                    return activityMapper.toDTO(act);
                                }).toList())
                .totalDurationSeconds(studySession.getTotalDurationSeconds())
                .note(studySession.getNote())
                .build();

    }

}
