import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ReactNode } from "react";

interface CardChartProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function CardChart({ title, children, className }: CardChartProps) {
  return (
    <Card className={`w-full bg-muted/50 dark:bg-muted/20 ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        {children}
      </CardContent>
    </Card>
  );
}
