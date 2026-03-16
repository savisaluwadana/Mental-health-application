export type Role = "client" | "practitioner";
export type SessionStatus = "upcoming" | "completed" | "missed";
export type SessionType = "Video" | "In-Person";

export interface ClientProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  joinedAt: string;
  lastSessionAt: string;
  status: "stable" | "improving" | "attention";
  wellbeingScore: number;
  flags: string[];
  goals: string[];
}

export interface TherapistProfile {
  id: string;
  name: string;
  avatar: string;
  specializations: string[];
  languages: string[];
  priceLkr: number;
  rating: number;
  bio: string;
}

export interface Session {
  id: string;
  clientId: string;
  therapistId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: SessionType;
  status: SessionStatus;
  note?: string;
  summary?: string;
}

export interface MoodLog {
  id: string;
  clientId: string;
  date: string;
  score: number;
  note?: string;
}

export interface CheckIn {
  id: string;
  clientId: string;
  date: string;
  answers: number[];
  totalScore: number;
}

export interface Goal {
  id: string;
  clientId: string;
  title: string;
  progress: number;
  targetDate: string;
  status: "active" | "completed";
}

export interface ClinicalNote {
  id: string;
  clientId: string;
  authorId: string;
  date: string;
  content: string;
}

export interface ActivityItem {
  id: string;
  clientId: string;
  date: string;
  type: "session" | "goal" | "checkin" | "mood";
  message: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderRole: Role;
  senderName: string;
  content: string;
  timestamp: string;
}

const today = new Date();

const toISO = (daysAgo: number) => {
  const d = new Date(today);
  d.setDate(today.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
};

export const clients: ClientProfile[] = [
  {
    id: "c1",
    name: "Amara Perera",
    age: 29,
    avatar: "AP",
    joinedAt: "2025-07-10",
    lastSessionAt: "2026-03-10",
    status: "improving",
    wellbeingScore: 74,
    flags: ["Sleep irregularity"],
    goals: ["Improve sleep hygiene", "Reduce overthinking before work"],
  },
  {
    id: "c2",
    name: "Kavindi Rodrigo",
    age: 34,
    avatar: "KR",
    joinedAt: "2025-11-03",
    lastSessionAt: "2026-03-08",
    status: "stable",
    wellbeingScore: 81,
    flags: [],
    goals: ["Maintain journaling streak"],
  },
  {
    id: "c3",
    name: "Nimal Fernando",
    age: 41,
    avatar: "NF",
    joinedAt: "2025-09-24",
    lastSessionAt: "2026-03-12",
    status: "attention",
    wellbeingScore: 61,
    flags: ["High stress at work", "Skipped last check-in"],
    goals: ["Practice 10-min evening unwind"],
  },
];

export const therapists: TherapistProfile[] = [
  {
    id: "t1",
    name: "Pranesh Silva",
    avatar: "PS",
    specializations: ["CBT", "Anxiety", "Work Stress"],
    languages: ["English", "Sinhala"],
    priceLkr: 8500,
    rating: 4.9,
    bio: "Senior therapist with 9+ years supporting professionals with stress, anxiety, and burnout recovery.",
  },
  {
    id: "t2",
    name: "Dulani Jayasekara",
    avatar: "DJ",
    specializations: ["Trauma-informed care", "Mindfulness"],
    languages: ["English", "Sinhala", "Tamil"],
    priceLkr: 9200,
    rating: 4.8,
    bio: "Focused on grounding techniques and long-term emotional resilience with practical routines.",
  },
  {
    id: "t3",
    name: "Raveen Peris",
    avatar: "RP",
    specializations: ["Couples Therapy", "Depression", "Grief"],
    languages: ["English", "Sinhala"],
    priceLkr: 7800,
    rating: 4.7,
    bio: "Warm, collaborative approach with clear weekly plans for meaningful personal progress.",
  },
];

export const moodLogs: MoodLog[] = [
  { id: "m1", clientId: "c1", date: toISO(13), score: 2, note: "Poor sleep." },
  { id: "m2", clientId: "c1", date: toISO(12), score: 3 },
  { id: "m3", clientId: "c1", date: toISO(11), score: 3 },
  { id: "m4", clientId: "c1", date: toISO(10), score: 2, note: "Work pressure." },
  { id: "m5", clientId: "c1", date: toISO(9), score: 4 },
  { id: "m6", clientId: "c1", date: toISO(8), score: 3 },
  { id: "m7", clientId: "c1", date: toISO(7), score: 3 },
  { id: "m8", clientId: "c1", date: toISO(6), score: 4 },
  { id: "m9", clientId: "c1", date: toISO(5), score: 4 },
  { id: "m10", clientId: "c1", date: toISO(4), score: 3 },
  { id: "m11", clientId: "c1", date: toISO(3), score: 4 },
  { id: "m12", clientId: "c1", date: toISO(2), score: 5, note: "Morning walk helped." },
  { id: "m13", clientId: "c1", date: toISO(1), score: 4 },
  { id: "m14", clientId: "c1", date: toISO(0), score: 4 },
  { id: "m15", clientId: "c2", date: toISO(0), score: 4 },
  { id: "m16", clientId: "c3", date: toISO(0), score: 2 },
];

export const sessions: Session[] = [
  {
    id: "s1",
    clientId: "c1",
    therapistId: "t1",
    date: "2026-03-01",
    startTime: "10:00",
    endTime: "10:50",
    type: "Video",
    status: "completed",
    note: "Focused on identifying worry triggers and grounding breathwork.",
    summary: "Amara reflected on recurring pressure before team meetings and practised cognitive reframing.",
  },
  {
    id: "s2",
    clientId: "c1",
    therapistId: "t1",
    date: "2026-03-10",
    startTime: "09:00",
    endTime: "09:50",
    type: "Video",
    status: "completed",
    note: "Reviewed sleep routine adherence and evening wind-down plan.",
    summary: "Sleep improved on 4/7 nights. Added a no-phone buffer 30 minutes before bedtime.",
  },
  {
    id: "s3",
    clientId: "c1",
    therapistId: "t1",
    date: "2026-03-19",
    startTime: "14:00",
    endTime: "14:50",
    type: "In-Person",
    status: "upcoming",
    note: "Follow-up on stress cycles and confidence scripts.",
  },
  {
    id: "s4",
    clientId: "c2",
    therapistId: "t2",
    date: "2026-03-18",
    startTime: "11:00",
    endTime: "11:50",
    type: "Video",
    status: "upcoming",
  },
  {
    id: "s5",
    clientId: "c3",
    therapistId: "t1",
    date: "2026-03-17",
    startTime: "16:00",
    endTime: "16:50",
    type: "Video",
    status: "upcoming",
  },
];

export const checkIns: CheckIn[] = [
  {
    id: "ci1",
    clientId: "c1",
    date: "2026-03-11",
    answers: [1, 1, 2, 1, 1],
    totalScore: 6,
  },
];

export const goals: Goal[] = [
  {
    id: "g1",
    clientId: "c1",
    title: "Sleep by 11:00 PM at least 5 nights/week",
    progress: 65,
    targetDate: "2026-04-10",
    status: "active",
  },
  {
    id: "g2",
    clientId: "c1",
    title: "Practice 5-minute breathing reset each workday",
    progress: 78,
    targetDate: "2026-04-01",
    status: "active",
  },
  {
    id: "g3",
    clientId: "c1",
    title: "Complete two mindful walks per week",
    progress: 40,
    targetDate: "2026-04-15",
    status: "active",
  },
];

export const notes: ClinicalNote[] = [
  {
    id: "n1",
    clientId: "c1",
    authorId: "t1",
    date: "2026-03-10",
    content: "Client responded positively to cognitive reframing. Next: monitor perfectionism triggers.",
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: "a1",
    clientId: "c1",
    date: "2026-03-12",
    type: "mood",
    message: "Amara logged mood score 5 with note about morning walk.",
  },
  {
    id: "a2",
    clientId: "c1",
    date: "2026-03-11",
    type: "checkin",
    message: "Amara submitted weekly check-in (score: 6).",
  },
  {
    id: "a3",
    clientId: "c3",
    date: "2026-03-10",
    type: "goal",
    message: "Nimal marked evening unwind goal as stalled.",
  },
  {
    id: "a4",
    clientId: "c2",
    date: "2026-03-09",
    type: "session",
    message: "Kavindi rescheduled a session to 18 Mar.",
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "cm1",
    sessionId: "s3",
    senderRole: "practitioner",
    senderName: "Pranesh Silva",
    content: "Hi Amara, we can start with a short breathing reset once you join.",
    timestamp: "2026-03-16T13:55:00.000Z",
  },
  {
    id: "cm2",
    sessionId: "s3",
    senderRole: "client",
    senderName: "Amara Perera",
    content: "Perfect, I am joining in a minute.",
    timestamp: "2026-03-16T13:57:00.000Z",
  },
];
