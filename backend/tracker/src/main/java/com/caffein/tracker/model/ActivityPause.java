package com.caffein.tracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "activity_pause")
public class ActivityPause {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String pauseTimeStart;

    private String pauseTimeEnd;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private Activity activity;

}
