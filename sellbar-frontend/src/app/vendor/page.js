"use client";
import PanelShell from "../../components/PanelShell";
import DashboardView from "../../components/DashboardView";

export default function VendorDashboard() {
  return (
    <PanelShell role="vendor" title="Vendor Dashboard">
      {(session) => <DashboardView endpoint="/vendor/dashboard" session={session} />}
    </PanelShell>
  );
}
