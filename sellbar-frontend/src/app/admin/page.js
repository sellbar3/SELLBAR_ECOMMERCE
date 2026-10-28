"use client";
import PanelShell from "../../components/PanelShell";
import DashboardView from "../../components/DashboardView";

export default function AdminDashboard() {
  return (
    <PanelShell role="admin" title="Admin Dashboard">
      {(session) => <DashboardView endpoint="/admin/dashboard" session={session} />}
    </PanelShell>
  );
}
