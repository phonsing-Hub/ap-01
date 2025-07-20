"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InboxPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Inbox</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Inbox</CardTitle>
          <CardDescription>
            View and manage incoming messages and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Inbox messages will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 