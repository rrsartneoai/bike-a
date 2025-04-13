import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: Props) {
  return (
    <Card className="border-border hover:border-primary/50 transition-colors duration-300 h-full">
      <CardContent className="pt-6">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
