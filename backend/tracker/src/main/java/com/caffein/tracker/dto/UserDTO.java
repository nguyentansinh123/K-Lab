package com.caffein.tracker.dto;

import com.caffein.tracker.model.type.RoleType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {

    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private Boolean emailVerified;

    private RoleType role;

    private String imgUrl; 

}
