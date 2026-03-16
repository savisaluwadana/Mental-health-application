"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  activityFeed as seedActivityFeed,
  checkIns as seedCheckIns,
  clients as seedClients,
  goals as seedGoals,
  moodLogs as seedMoodLogs,
  notes as seedNotes,
  sessions as seedSessions,
  therapists as seedTherapists,
  type ActivityItem,
  type CheckIn,
  type ClientProfile,
  type ClinicalNote,
  type Goal,
  type MoodLog,
  type Role,
  type Session,
  type SessionStatus,
  type TherapistProfile,
} from "@/lib/mock-data";

interface AddSessionInput {
  clientId: string;
  therapistId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: "Video" | "In-Person";
  status?: SessionStatus;
  note?: string;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  toggleRole: () => void;
  clients: ClientProfile[];
  therapists: TherapistProfile[];
  sessions: Session[];
  moods: MoodLog[];
  checkIns: CheckIn[];
  goals: Goal[];
  notes: ClinicalNote[];
  activityFeed: ActivityItem[];
  activeClientId: string;
  activeTherapistId: string;
  addMoodLog: (input: { clientId: string; score: number; note?: string }) => void;
  submitCheckIn: (input: { clientId: string; answers: number[] }) => void;
  addNote: (input: { clientId: string; authorId: string; content: string }) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  addSession: (input: AddSessionInput) => void;
  updateSessionStatus: (sessionId: string, status: SessionStatus) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const makeId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("client");
  const [clients] = useState<ClientProfile[]>(seedClients);
  const [therapists] = useState<TherapistProfile[]>(seedTherapists);
  const [sessions, setSessions] = useState<Session[]>(seedSessions);
  const [moods, setMoods] = useState<MoodLog[]>(seedMoodLogs);
  const [checkIns, setCheckIns] = useState<CheckIn[]>(seedCheckIns);
  const [goals, setGoals] = useState<Goal[]>(seedGoals);
  const [notes, setNotes] = useState<ClinicalNote[]>(seedNotes);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(seedActivityFeed);

  const toggleRole = useCallback(() => {
    setRole((prev) => (prev === "client" ? "practitioner" : "client"));
  }, []);

  const addMoodLog = useCallback((input: { clientId: string; score: number; note?: string }) => {
    const item: MoodLog = {
      id: makeId("mood"),
      clientId: input.clientId,
      date: todayIso(),
      score: input.score,
      note: input.note,
    };
    setMoods((prev) => [item, ...prev]);
    setActivityFeed((prev) => [
      {
        id: makeId("activity"),
        clientId: input.clientId,
        date: todayIso(),
        type: "mood",
        message: `Mood logged with score ${input.score}.`,
      },
      ...prev,
    ]);
  }, []);

  const submitCheckIn = useCallback((input: { clientId: string; answers: number[] }) => {
    const totalScore = input.answers.reduce((sum, value) => sum + value, 0);
    const item: CheckIn = {
      id: makeId("checkin"),
      clientId: input.clientId,
      date: todayIso(),
      answers: input.answers,
      totalScore,
    };
    setCheckIns((prev) => [item, ...prev]);
    setActivityFeed((prev) => [
      {
        id: makeId("activity"),
        clientId: input.clientId,
        date: todayIso(),
        type: "checkin",
        message: `Weekly check-in submitted (score ${totalScore}).`,
      },
      ...prev,
    ]);
  }, []);

  const addNote = useCallback((input: { clientId: string; authorId: string; content: string }) => {
    const item: ClinicalNote = {
      id: makeId("note"),
      clientId: input.clientId,
      authorId: input.authorId,
      date: todayIso(),
      content: input.content,
    };
    setNotes((prev) => [item, ...prev]);
  }, []);

  const updateGoal = useCallback((goalId: string, updates: Partial<Goal>) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal)));
  }, []);

  const addSession = useCallback((input: AddSessionInput) => {
    const item: Session = {
      id: makeId("session"),
      status: "upcoming",
      ...input,
    };
    setSessions((prev) => [item, ...prev]);
    setActivityFeed((prev) => [
      {
        id: makeId("activity"),
        clientId: input.clientId,
        date: input.date,
        type: "session",
        message: `Session booked for ${input.date} at ${input.startTime}.`,
      },
      ...prev,
    ]);
  }, []);

  const updateSessionStatus = useCallback((sessionId: string, status: SessionStatus) => {
    setSessions((prev) => prev.map((session) => (session.id === sessionId ? { ...session, status } : session)));
  }, []);

  const value = useMemo<AppContextType>(
    () => ({
      role,
      setRole,
      toggleRole,
      clients,
      therapists,
      sessions,
      moods,
      checkIns,
      goals,
      notes,
      activityFeed,
      activeClientId: "c1",
      activeTherapistId: "t1",
      addMoodLog,
      submitCheckIn,
      addNote,
      updateGoal,
      addSession,
      updateSessionStatus,
    }),
    [
      role,
      clients,
      therapists,
      sessions,
      moods,
      checkIns,
      goals,
      notes,
      activityFeed,
      addMoodLog,
      submitCheckIn,
      addNote,
      updateGoal,
      addSession,
      updateSessionStatus,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
}
