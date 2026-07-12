import { PageHeading } from "@/components/page-heading"
import { SettingsPanel } from "@/components/settings/settings-panel"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Settings"
        description="Configure your profile, notifications, integrations and security preferences."
        action={
          <Button>Save changes</Button>
        }
      />
      <SettingsPanel />
    </div>
  )
}
