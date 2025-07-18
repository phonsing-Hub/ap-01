import React from "react";
import { Separator } from "@/components/ui/separator";
import { NotificationsForm } from "@/components/profile/notifications-form";

function page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
}

export default page;
