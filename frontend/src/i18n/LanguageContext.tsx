import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

export type Language = "en" | "vi";

const LANGUAGE_STORAGE_KEY = "kinetic-language";

const messages = {
  en: {
    dashboard: "Dashboard",
    howItWorks: "How it works",
    docs: "Docs",
    github: "GitHub",
    profile: "Profile settings",
    history: "History logs",
    sessions: "Sessions",
    logout: "Log out",
    login: "Login",
    getStarted: "Get started",
    profileTitle: "Operator settings",
    profileSubtitle: "Account, tracking, and interface preferences.",
    identity: "Identity",
    changePhoto: "Change profile photo",
    photoHint: "JPG, PNG, or WebP · up to 5 MB",
    uploading: "Uploading…",
    language: "Language",
    languageHint: "Changes supported interface labels immediately.",
    english: "English",
    vietnamese: "Vietnamese",
    focusTracking: "Focus tracking",
    focusHint: "Choose how your head angle should be interpreted during a session.",
    screenMode: "Screen mode",
    screenModeHint: "Looking near the camera or display counts as focused.",
    paperMode: "Paper mode",
    paperModeHint: "A natural downward reading and writing angle counts as focused.",
    privacy: "Camera analysis runs in your browser. Frames are never uploaded.",
    account: "Account",
    loggedInAs: "Logged in as",
    music: "Music",
    openMusic: "Open music",
    closeMusic: "Close music",
    customMusic: "Custom music",
    youtubeLink: "YouTube link",
    uploadMusic: "Upload music",
    trackName: "Track name",
    audioFile: "Audio file",
    chooseAudio: "Choose an audio file",
    createAndPlay: "Create & play",
    cancel: "Cancel",
    invalidYoutube: "Enter a valid playable YouTube link.",
    missingAudio: "Choose an audio file first.",
    youtubeLoop: "YouTube playback will restart automatically.",
    audioLoop: "Your uploaded audio stays local and loops until you leave this page.",
    consistencyGrid: "Consistency grid",
    learningSignal: "Learning signal",
    activeDays: "Active days",
    totalFocus: "Total focus",
    dailyAverage: "Daily average",
    bestDay: "Best day",
    noStudy: "No study time",
    lessFocus: "Less",
    moreFocus: "More",
    heatHint: "Every studied second is recorded",
    cameraStart: "Start camera",
    cameraStop: "Stop camera",
    loadingModels: "Loading face-angle model…",
    cameraReady: "Angle tracking ready",
    cameraError: "Camera or face model could not start.",
    faceMissing: "No face detected",
    focused: "Focused",
    adjustPosition: "Adjust position",
    focusScore: "Focus score",
    yaw: "Yaw",
    pitch: "Pitch",
    mode: "Mode",
  },
  vi: {
    dashboard: "Tổng quan",
    howItWorks: "Cách hoạt động",
    docs: "Tài liệu",
    github: "GitHub",
    profile: "Cài đặt hồ sơ",
    history: "Lịch sử",
    sessions: "Phiên học",
    logout: "Đăng xuất",
    login: "Đăng nhập",
    getStarted: "Bắt đầu",
    profileTitle: "Cài đặt cá nhân",
    profileSubtitle: "Tài khoản, theo dõi tập trung và tùy chọn giao diện.",
    identity: "Thông tin cá nhân",
    changePhoto: "Đổi ảnh đại diện",
    photoHint: "JPG, PNG hoặc WebP · tối đa 5 MB",
    uploading: "Đang tải lên…",
    language: "Ngôn ngữ",
    languageHint: "Các nhãn được hỗ trợ sẽ đổi ngay lập tức.",
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",
    focusTracking: "Theo dõi tập trung",
    focusHint: "Chọn cách ứng dụng hiểu góc đầu của bạn trong phiên học.",
    screenMode: "Chế độ màn hình",
    screenModeHint: "Nhìn gần camera hoặc màn hình được tính là tập trung.",
    paperMode: "Chế độ giấy",
    paperModeHint: "Góc cúi tự nhiên khi đọc và viết vẫn được tính là tập trung.",
    privacy: "Camera được phân tích trong trình duyệt. Khung hình không được tải lên.",
    account: "Tài khoản",
    loggedInAs: "Đang đăng nhập bằng",
    music: "Âm nhạc",
    openMusic: "Mở nhạc",
    closeMusic: "Đóng nhạc",
    customMusic: "Nhạc tùy chọn",
    youtubeLink: "Liên kết YouTube",
    uploadMusic: "Tải nhạc lên",
    trackName: "Tên bản nhạc",
    audioFile: "Tệp âm thanh",
    chooseAudio: "Chọn một tệp âm thanh",
    createAndPlay: "Tạo và phát",
    cancel: "Hủy",
    invalidYoutube: "Hãy nhập liên kết YouTube hợp lệ.",
    missingAudio: "Hãy chọn tệp âm thanh trước.",
    youtubeLoop: "YouTube sẽ tự động phát lại từ đầu.",
    audioLoop: "Tệp nhạc chỉ ở trong trình duyệt và sẽ lặp đến khi bạn rời trang.",
    consistencyGrid: "Lưới duy trì",
    learningSignal: "Tín hiệu học tập",
    activeDays: "Ngày hoạt động",
    totalFocus: "Tổng tập trung",
    dailyAverage: "Trung bình ngày",
    bestDay: "Ngày tốt nhất",
    noStudy: "Chưa học",
    lessFocus: "Ít",
    moreFocus: "Nhiều",
    heatHint: "Mỗi giây học đều được ghi nhận",
    cameraStart: "Bật camera",
    cameraStop: "Tắt camera",
    loadingModels: "Đang tải mô hình góc khuôn mặt…",
    cameraReady: "Theo dõi góc đã sẵn sàng",
    cameraError: "Không thể bật camera hoặc mô hình khuôn mặt.",
    faceMissing: "Không tìm thấy khuôn mặt",
    focused: "Đang tập trung",
    adjustPosition: "Điều chỉnh vị trí",
    focusScore: "Điểm tập trung",
    yaw: "Góc ngang",
    pitch: "Góc dọc",
    mode: "Chế độ",
  },
} as const;

export type TranslationKey = keyof (typeof messages)["en"];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "vi" ? "vi" : "en";
};

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    const setLanguage = (nextLanguage: Language) => {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      document.documentElement.lang = nextLanguage;
      setLanguageState(nextLanguage);
    };

    return {
      language,
      setLanguage,
      t: (key) => messages[language][key],
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// The provider and its typed hook intentionally live together as one small context module.
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
