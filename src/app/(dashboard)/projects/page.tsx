import { Topbar } from "@/feature/layout/Topbar/Topbar";
import { Separator } from "@/components/ui/separator";

import { CreateProject } from "@/feature/project/CreateProject";
import { ProjectTable } from "@/feature/project/projectTable";

export default async function ProjectsPage() {
  return (
    <>
      <Topbar />
      <div className="custom-container mt-5 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Welcome back!</h3>
            <p className="text-sm text-muted-foreground">
              {"Create and manage Projects."}
            </p>
          </div>
          <CreateProject />
        </div>
        <Separator />
        <div className="mx-auto ">
          <ProjectTable />
        </div>
      </div>
    </>
  );
}
