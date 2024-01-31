"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { api } from "@/trpc/react";
import { globalStore } from "@/store/global.store";
import { useForm } from "react-hook-form";
import {
  type createProjectDto,
  createProjectSchema,
} from "@/server/api/routers/projects/project.type";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateProject = () => {
  const [showNewProjectDialog, setShowNewProjectDialog] = React.useState(false);
  const utils = api.useUtils();
  const { mutate, isLoading } = api.projects.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      globalStore.setSelectedProject(data);
      setShowNewProjectDialog(false);
      void utils.projects.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createProjectDto>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = (data: createProjectDto) => {
    mutate(data);
  };

  return (
    <div>
      <Dialog
        open={showNewProjectDialog}
        onOpenChange={setShowNewProjectDialog}
      >
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Add a new team to manage products and customers.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Project name"
                  />
                  {errors.name ? (
                    <p className="text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type={"button"}
                variant="outline"
                onClick={() => setShowNewProjectDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                Continue
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
