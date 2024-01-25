import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type FC } from "react";
import { type RouterOutputs } from "@/trpc/shared";

type Project = RouterOutputs["projects"]["getAll"][0];
export const ProjectCard: FC<Project> = ({ description, title }) => {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div>Created April 2023</div>
          <div>Updated April 2023</div>
        </div>
      </CardContent>
    </Card>
  );
};
