"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

export const ProjectCreateForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const invalidData = api.useUtils();

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),

    description: z.string().min(50, "Description is required"),
  });

  type dataType = z.infer<typeof formSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<dataType>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isLoading } = api.projects.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "Project Created",
      });
      await invalidData.projects.invalidate();
      onClose();
    },
  });

  const onsubmit = (data: dataType) => {
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Title</Label>
        <Input
          id="title"
          type="text"
          {...register("title")}
          placeholder="project title"
        />
        {errors.title ? (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Type your message here."
        />
        {errors.description ? (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        ) : null}
      </div>
      <Button disabled={isLoading} type={"submit"} className="w-full">
        {isLoading ? "Loading..." : "Create"}
      </Button>
    </form>
  );
};
