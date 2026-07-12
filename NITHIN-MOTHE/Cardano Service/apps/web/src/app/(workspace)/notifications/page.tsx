import { Bell, CheckCircle2, MailOpen } from "lucide-react";

import { NotificationsList } from "@/components/demo-sections";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Preferences</Button>
            <Button>Mark all read</Button>
          </>
        }
        description="Review user alerts, system events, webhook delivery notices, and AI-generated dispute updates."
        eyebrow="Notifications"
        title="Notification inbox"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Bell} label="Unread" tone="Need attention" value="2" />
        <StatCard icon={MailOpen} label="Delivered" tone="Last 24 hours" value="18" />
        <StatCard icon={CheckCircle2} label="Read rate" tone="Operator team" value="91%" />
      </div>
      <div className="mt-4">
        <NotificationsList />
      </div>
    </>
  );
}
