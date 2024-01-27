"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  type createProjectDto,
  createProjectSchema,
} from "@/server/api/routers/projects/project.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { globalStore, useGlobalStore } from "@/store/global.store";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  className?: string;
}

export default function ProjectSwitcher({ className }: TeamSwitcherProps) {
  const { data: sessionData } = useSession();

  const { data: projects, refetch } = api.projects.getAll.useQuery(undefined, {
    enabled: sessionData !== undefined,
  });

  const [open, setOpen] = React.useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = React.useState(false);

  // Create Project form validation and mutation

  const { mutate, isLoading } = api.projects.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      globalStore.setSelectedProject(data);
      void refetch();
      setShowNewProjectDialog(false);
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

  const { selectedProject } = useGlobalStore();

  return (
    <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-full justify-between", className)}
          >
            {selectedProject?.name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-full p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>

              <CommandGroup heading={"Projects"}>
                {projects?.map((project) => (
                  <CommandItem
                    key={project.id}
                    onSelect={() => {
                      globalStore.setSelectedProject(project);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {project.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedProject?.id === project.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewProjectDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Project
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

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
                  <p className="text-sm text-red-600">{errors.name.message}</p>
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
  );
}
