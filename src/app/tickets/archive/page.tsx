"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArchiveTicketsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trash / Archive</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Archived Tickets</CardTitle>
          <CardDescription>
            View archived and deleted tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Archived tickets will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 