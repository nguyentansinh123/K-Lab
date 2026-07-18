package com.caffein.tracker.service.activity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class ActivityServiceFocusScoreTest {

    @Test
    void centeredScreenPostureScoresOneHundred() {
        assertEquals(100, ActivityService.calculateFocusScore(false, 10, 10, 0D, 0D));
    }

    @Test
    void paperModeAcceptsAComfortableDownwardAngle() {
        int paperScore = ActivityService.calculateFocusScore(true, 10, 10, 0D, -22D);
        int screenScore = ActivityService.calculateFocusScore(false, 10, 10, 0D, -22D);

        assertEquals(100, paperScore);
        assertTrue(paperScore > screenScore);
    }

    @Test
    void missingFaceSamplesReduceTheScore() {
        assertEquals(0, ActivityService.calculateFocusScore(false, 10, 0, null, null));
    }

    @Test
    void noCameraSamplesProduceNoScore() {
        assertNull(ActivityService.calculateFocusScore(false, 0, 0, null, null));
    }
}
