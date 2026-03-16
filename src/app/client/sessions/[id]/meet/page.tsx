"use client";

import { SecureMeetRoom } from "@/components/session/SecureMeetRoom";
import { useParams } from "next/navigation";

export default function ClientSessionMeetPage() {
  const { id } = useParams<{ id: string }>();

  return <SecureMeetRoom sessionId={id} />;
}
