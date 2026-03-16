"use client";

import { Card } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";
import { Mic, MicOff, Send, ShieldCheck, Video, VideoOff } from "lucide-react";
import { useMemo, useState } from "react";

interface SecureMeetRoomProps {
  sessionId: string;
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export function SecureMeetRoom({ sessionId }: SecureMeetRoomProps) {
  const { sessions, therapists, clients, chatMessages, sendChatMessage, role } = useAppContext();
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [draft, setDraft] = useState("");

  const session = sessions.find((item) => item.id === sessionId);
  const therapistName = therapists.find((item) => item.id === session?.therapistId)?.name;
  const clientName = clients.find((item) => item.id === session?.clientId)?.name;

  const roomMessages = useMemo(
    () => chatMessages.filter((item) => item.sessionId === sessionId),
    [chatMessages, sessionId],
  );

  if (!session) {
    return <p className="text-sm text-slate-600">Session not found.</p>;
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Secure Session Meetup</h1>
            <p className="mt-1 text-sm text-slate-600">
              {session.date} • {session.startTime} - {session.endTime}
            </p>
            <p className="text-sm text-slate-600">{clientName} with {therapistName}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck size={14} /> End-to-end encrypted
          </span>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="aspect-video rounded-xl border border-slate-200 bg-slate-900/90 p-4 text-white">
            <p className="text-sm text-slate-200">Live video stream</p>
            <div className="mt-3 grid h-[calc(100%-2rem)] grid-cols-2 gap-3">
              <div className="flex items-end justify-start rounded-lg border border-white/10 bg-slate-800 p-3 text-xs">
                {role === "client" ? clientName : therapistName} (You)
              </div>
              <div className="flex items-end justify-start rounded-lg border border-white/10 bg-slate-700 p-3 text-xs">
                {role === "client" ? therapistName : clientName}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCameraOn((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${cameraOn ? "bg-sage-600 text-white" : "bg-slate-200 text-slate-700"}`}
            >
              {cameraOn ? <Video size={16} /> : <VideoOff size={16} />}
              {cameraOn ? "Camera on" : "Camera off"}
            </button>
            <button
              type="button"
              onClick={() => setMicOn((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${micOn ? "bg-sage-600 text-white" : "bg-slate-200 text-slate-700"}`}
            >
              {micOn ? <Mic size={16} /> : <MicOff size={16} />}
              {micOn ? "Mic on" : "Mic off"}
            </button>
          </div>
        </Card>

        <Card className="flex h-[460px] flex-col">
          <p className="text-sm font-medium text-slate-800">Session chat</p>
          <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
            {roomMessages.length === 0 && <p className="text-xs text-slate-500">No messages yet.</p>}
            {roomMessages.map((message) => (
              <div key={message.id} className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-xs font-medium text-slate-700">{message.senderName}</p>
                <p className="text-sm text-slate-700">{message.content}</p>
                <p className="text-[11px] text-slate-500">{formatTime(message.timestamp)}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a secure message"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => {
                const content = draft.trim();
                if (!content) return;
                sendChatMessage({ sessionId, content });
                setDraft("");
              }}
              className="inline-flex items-center rounded-lg bg-sage-600 p-2 text-white"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
