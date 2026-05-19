# Study Tracker Project Instructions

## Product Idea

This app helps users track study/productivity time in a simple, GitHub-contributions-style way.

Core flow:
- The user starts a clock/timer when they begin studying or doing focused work.
- The user can enter a `title` for the session, such as "Math revision" or "Backend API".
- The user can enter an `appName` for the tool or app they used, such as "VS Code", "Anki", "Chrome", or "Notion".
- When the session ends, the app stores the time spent.
- The app totals study/productivity time per day.
- The UI shows a contribution-grid style calendar where each day is a green dot/square.
- The shade/intensity of the green marker depends on how many hours were studied that day.

## Domain Language

Use these terms consistently:
- `Activity`: a tracked study/productivity session or category of work.
- `title`: user-facing name for what they studied or worked on.
- `appName`: the application/tool used during the activity.
- `duration`: total time spent in a session.
- `study day`: a calendar day with one or more tracked sessions.
- `daily total`: sum of tracked duration for one day.
- `contribution grid`: calendar heatmap inspired by GitHub contributions.

## Expected Features

Backend should eventually support:
- Creating an activity/session.
- Starting and stopping a timer.
- Recording start time, end time, and duration.
- Querying sessions by day, week, month, and user.
- Returning daily totals for the contribution grid.
- Returning intensity levels for each day, based on daily total hours.

Frontend should eventually support:
- A clear timer/clock control.
- Inputs for `title` and `appName`.
- A daily summary of time spent studying.
- A contribution-grid calendar using green intensity levels.
- Session history for the current day.

## Contribution Grid Intensity

Use simple, explainable levels at first:
- `0`: no study time.
- `1`: less than 1 hour.
- `2`: 1 to 2 hours.
- `3`: 2 to 4 hours.
- `4`: 4 or more hours.

These thresholds can change later, but keep the API shape stable if possible.

## Backend Preferences

This repo uses a Spring Boot backend under `tracker/`.

Prefer:
- Java + Spring Boot conventions already present in the repo.
- JPA entities for persisted domain objects.
- DTOs for request/response payloads.
- Services for business logic.
- Repositories for database access.
- Explicit methods when Lombok confuses the Java language server.

Avoid:
- Large unrelated refactors.
- Changing database shape without a clear migration/update plan.
- Putting timer/business logic in controllers.

## Lombok And Neovim Note

The Java language server in Neovim may sometimes show false diagnostics around Lombok-generated methods or constructors.

When implementing entities:
- Use `@NoArgsConstructor` for JPA entities.
- Use `@AllArgsConstructor` with `@Builder` when a builder needs all fields.
- Do not combine `@RequiredArgsConstructor` and `@NoArgsConstructor` on an entity unless fields actually require it.
- If Spring Security or an interface requires a method, prefer writing the method explicitly when diagnostics are noisy.

## Testing

When practical, run backend checks from `tracker/`:

```sh
./mvnw test
```

For faster compile-only checks:

```sh
./mvnw -q -DskipTests compile
```

