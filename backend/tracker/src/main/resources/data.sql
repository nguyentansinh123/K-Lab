-- Permanent local demo account
-- Email: demo@studytracker.local
-- Password: Demo123!

INSERT IGNORE INTO users (
    id,
    first_name,
    last_name,
    email,
    password,
    email_verified,
    role,
    img_url
) VALUES (
    'demo-user-000000000000000000000001',
    'Demo',
    'Student',
    'demo@studytracker.local',
    '$2a$10$JoyJQSh3yC20ZDxMfy9vFuwyULwPmp2ipNeXQ2AAgWsqZcYz6l/NG',
    TRUE,
    'USER',
    'https://picsum.photos/seed/studytracker-demo/300'
);

-- Your streak definition counts transitions between consecutive days:
--   today through 5 days ago = current streak 5
--   10 through 20 days ago   = longest streak 10
INSERT INTO study_session (
    id,
    user_id,
    date,
    total_duration_seconds,
    note
) VALUES
    ('demo-session-0001', 'demo-user-000000000000000000000001', CURRENT_DATE,                       5700, 'Built the study-session dashboard and reviewed the API response.'),
    ('demo-session-0002', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 1 DAY,      4200, 'Practised Spring service and repository patterns.'),
    ('demo-session-0003', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 2 DAY,      8100, 'Connected the React dashboard to the backend.'),
    ('demo-session-0004', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 3 DAY,      3000, 'Reviewed Java streams and date handling.'),
    ('demo-session-0005', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 4 DAY,      9000, 'Implemented authentication and JWT refresh logic.'),
    ('demo-session-0006', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 5 DAY,      4800, 'Worked through SQL joins and indexing exercises.'),

    ('demo-session-0007', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 10 DAY,     6600, 'Refactored frontend state management.'),
    ('demo-session-0008', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 11 DAY,     3600, 'Read Spring Data JPA documentation.'),
    ('demo-session-0009', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 12 DAY,    10800, 'Completed a longer algorithms practice block.'),
    ('demo-session-0010', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 13 DAY,     5400, 'Reviewed database schema design notes.'),
    ('demo-session-0011', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 14 DAY,     7200, 'Implemented controller validation and error responses.'),
    ('demo-session-0012', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 15 DAY,     4500, 'Practised TypeScript types and API contracts.'),
    ('demo-session-0013', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 16 DAY,     8400, 'Worked on entity relationships and DTO mapping.'),
    ('demo-session-0014', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 17 DAY,     3900, 'Reviewed authentication tests and Mockito.'),
    ('demo-session-0015', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 18 DAY,     9600, 'Built dashboard metrics and heatmap data.'),
    ('demo-session-0016', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 19 DAY,     5100, 'Studied database transactions and locking.'),
    ('demo-session-0017', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 20 DAY,     7500, 'Refactored the activity timer service.'),

    ('demo-session-0018', 'demo-user-000000000000000000000001', CURRENT_DATE - INTERVAL 35 DAY,     6000, 'Reviewed last month study notes.')
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id),
    date = VALUES(date),
    total_duration_seconds = VALUES(total_duration_seconds),
    note = VALUES(note);

-- Activities are completed so none is mistaken for an active timer.
-- duration is stored as a numeric String in the Java entity.
INSERT INTO activity (
    id,
    study_session_id,
    title,
    app_name,
    topic,
    activity_start_at,
    activity_end_at,
    duration
) VALUES
    ('demo-activity-0001', 'demo-session-0001', 'Dashboard API integration',       'Visual Studio Code', 'React and TypeScript',  CONCAT(CURRENT_DATE, 'T09:00:00'),                        CONCAT(CURRENT_DATE, 'T10:35:00'),                        '5700'),
    ('demo-activity-0002', 'demo-session-0002', 'Repository pattern practice',     'IntelliJ IDEA',      'Spring Boot',           CONCAT(CURRENT_DATE - INTERVAL 1 DAY,  'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 1 DAY,  'T10:10:00'),      '4200'),
    ('demo-activity-0003', 'demo-session-0003', 'Frontend state integration',      'Visual Studio Code', 'Redux Toolkit',         CONCAT(CURRENT_DATE - INTERVAL 2 DAY,  'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 2 DAY,  'T11:15:00'),      '8100'),
    ('demo-activity-0004', 'demo-session-0004', 'Streams and LocalDate exercises', 'IntelliJ IDEA',      'Core Java',             CONCAT(CURRENT_DATE - INTERVAL 3 DAY,  'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 3 DAY,  'T09:50:00'),      '3000'),
    ('demo-activity-0005', 'demo-session-0005', 'JWT authentication flow',         'IntelliJ IDEA',      'Spring Security',       CONCAT(CURRENT_DATE - INTERVAL 4 DAY,  'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 4 DAY,  'T11:30:00'),      '9000'),
    ('demo-activity-0006', 'demo-session-0006', 'Query optimisation exercises',    'DBeaver',            'MySQL',                 CONCAT(CURRENT_DATE - INTERVAL 5 DAY,  'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 5 DAY,  'T10:20:00'),      '4800'),

    ('demo-activity-0007', 'demo-session-0007', 'Redux slice refactor',            'Visual Studio Code', 'Frontend Architecture', CONCAT(CURRENT_DATE - INTERVAL 10 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 10 DAY, 'T10:50:00'),      '6600'),
    ('demo-activity-0008', 'demo-session-0008', 'JPA documentation review',        'Firefox',            'Spring Data JPA',       CONCAT(CURRENT_DATE - INTERVAL 11 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 11 DAY, 'T10:00:00'),      '3600'),
    ('demo-activity-0009', 'demo-session-0009', 'Graph algorithm practice',        'IntelliJ IDEA',      'Data Structures',       CONCAT(CURRENT_DATE - INTERVAL 12 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 12 DAY, 'T12:00:00'),     '10800'),
    ('demo-activity-0010', 'demo-session-0010', 'Schema modelling review',         'DBeaver',            'Database Design',       CONCAT(CURRENT_DATE - INTERVAL 13 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 13 DAY, 'T10:30:00'),      '5400'),
    ('demo-activity-0011', 'demo-session-0011', 'Controller validation',           'IntelliJ IDEA',      'REST APIs',             CONCAT(CURRENT_DATE - INTERVAL 14 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 14 DAY, 'T11:00:00'),      '7200'),
    ('demo-activity-0012', 'demo-session-0012', 'TypeScript API contracts',        'Visual Studio Code', 'TypeScript',            CONCAT(CURRENT_DATE - INTERVAL 15 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 15 DAY, 'T10:15:00'),      '4500'),
    ('demo-activity-0013', 'demo-session-0013', 'Entity and DTO mapping',          'IntelliJ IDEA',      'JPA Relationships',     CONCAT(CURRENT_DATE - INTERVAL 16 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 16 DAY, 'T11:20:00'),      '8400'),
    ('demo-activity-0014', 'demo-session-0014', 'Authentication unit tests',       'IntelliJ IDEA',      'Mockito',               CONCAT(CURRENT_DATE - INTERVAL 17 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 17 DAY, 'T10:05:00'),      '3900'),
    ('demo-activity-0015', 'demo-session-0015', 'Dashboard metrics and heatmap',   'Visual Studio Code', 'Data Visualisation',    CONCAT(CURRENT_DATE - INTERVAL 18 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 18 DAY, 'T11:40:00'),      '9600'),
    ('demo-activity-0016', 'demo-session-0016', 'Transaction and locking review',  'Firefox',            'Database Transactions', CONCAT(CURRENT_DATE - INTERVAL 19 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 19 DAY, 'T10:25:00'),      '5100'),
    ('demo-activity-0017', 'demo-session-0017', 'Activity timer refactor',         'IntelliJ IDEA',      'Backend Development',   CONCAT(CURRENT_DATE - INTERVAL 20 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 20 DAY, 'T11:05:00'),      '7500'),

    ('demo-activity-0018', 'demo-session-0018', 'Monthly study review',            'Obsidian',           'Study Review',          CONCAT(CURRENT_DATE - INTERVAL 35 DAY, 'T09:00:00'),      CONCAT(CURRENT_DATE - INTERVAL 35 DAY, 'T10:40:00'),      '6000')
ON DUPLICATE KEY UPDATE
    study_session_id = VALUES(study_session_id),
    title = VALUES(title),
    app_name = VALUES(app_name),
    topic = VALUES(topic),
    activity_start_at = VALUES(activity_start_at),
    activity_end_at = VALUES(activity_end_at),
    duration = VALUES(duration);
