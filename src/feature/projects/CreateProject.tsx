"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectCreateForm } from "@/feature/projects/components/ProjectCreateForm";
import { useExposure } from "@/lib/hooks/UseDisclosure";

export function CreateProject() {
  const { isOpen, onToggle, onClose } = useExposure();
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <div className="mt-6 flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <ProjectCreateForm onClose={onClose} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
