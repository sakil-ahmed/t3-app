import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Topbar = () => {
  return (
    <div className="flex h-[70px] w-full items-center justify-between p-5">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        The Joke Tax
      </h1>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};
