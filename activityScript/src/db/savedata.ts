import { db } from "./sqlite.js";
import { unproductive_keywords, productive_keywords, productive_apps } from "../productivity.js";

let currentSession: { app: string, title: string, startAt: string } | null = null

export const assignToCSession = (app: string, title: string) => {
    if (currentSession?.app != app || currentSession?.title != title) {
        savePreviousSession()
        currentSession = { app, title, startAt: new Date().toISOString() }
    }
}

export const savePreviousSession = (): void => {
    if (!currentSession) return
    let startAt = currentSession.startAt
    let endedAt = new Date().toISOString()
    let title = currentSession.title
    let app = currentSession.app
    let duration = Math.floor((Date.now() - new Date(currentSession.startAt).getTime()) / 60000)
    let productiveCheck = isProductive(app, title)

    if (ifAppAndTitleExist(app, title)) {

        db.prepare(`
        UPDATE activity_logs
        SET duration_mins = duration_mins + ?
        WHERE app = ? AND title = ?
        `)
            .run(duration, app, title);
    } else {
        const insertPoll = db.prepare(
            `
        Insert Into activity_logs
        (app, title, started_at, ended_at, duration_mins, is_productive)
        Values
        (?,?,?,?,?,?)
        `
        )
        insertPoll.run(app, title, startAt, endedAt, duration, productiveCheck)
    }

}

const ifAppAndTitleExist = (app: string, title: string): boolean => {
    const checkAppAndTitleQuery = `
      SELECT 1 FROM activity_logs
      WHERE app = ? AND title = ?
      LIMIT 1
    `;
    const result = db.prepare(checkAppAndTitleQuery).get(app, title);
    return result !== undefined;
};


export const isProductive = (app: string, title: string): "productive" | "unproductive" | "unknown" => {
    if (unproductive_keywords.some((k: string) => title.includes(k))) return "unproductive";
    if (productive_apps.some((a: string) => app.includes(a))) return "productive";
    if (productive_keywords.some((k: string) => title.includes(k))) return "productive";

    return "unknown"
}


