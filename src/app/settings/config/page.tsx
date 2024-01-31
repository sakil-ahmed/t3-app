import { Separator } from "@/components/ui/separator";

export default function ConfigPage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Config System</h3>
          <p className="text-sm text-muted-foreground">
            Configure how you receive notifications.
          </p>
        </div>
        <Separator />
        Config Form
      </div>
    </>
  );
}
