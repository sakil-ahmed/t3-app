import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiDeleteBin5Line } from "react-icons/ri";

export const DeleteModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="px-2">
          <RiDeleteBin5Line size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this Project?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
