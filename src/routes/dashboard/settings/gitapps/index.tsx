import { createFileRoute } from "@tanstack/react-router";
import EmptyState from "@/components/blocks/EmptyState";
import PageLayout from "@/components/blocks/PageLayout";
import GitAppCard from "@/components/cards/GitAppCard";
import { CreateGithubAppDialog } from "@/components/dialogs/CreateGithubAppDialog";
import { fetchGitApps } from "@/utils/gitproviderApi";
import { timeAgo } from "@/utils/timeAgo";
import { useEffect, useState } from "react";
import { FaGithubAlt } from "react-icons/fa6";

export const Route = createFileRoute("/dashboard/settings/gitapps/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [apps, setApps] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const fetchApps = async () => {
    setLoading(true);
    const data = await fetchGitApps();
    setApps(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <PageLayout
      title="Git Providers"
      icon={FaGithubAlt}
      description="Connect your Git provider for authentication."
      actions={<CreateGithubAppDialog />}
    >
      {apps.length === 0 ? (
        <EmptyState
          icon={FaGithubAlt}
          title="Create your own Github Provider apps."
        />
      ) : (
        <div className="flex flex-col items-center space-y-6">
          {apps.map((app: any) => (
            <GitAppCard
              name={app.name}
              appID={app.app_id}
              author_name={app.owner_login.login}
              avatarUrl={app.owner_login.avatar_url}
              installUrl={`https://github.com/apps/${app.slug}/installations/new/permissions?target_id=${app.owner_login.id}`}
              isInstalled={app.isInstalled}
              createdAt={timeAgo(app.createdAt)}
              refresh={() => fetchApps()}
            />
          ))}
        </div>
      )}
    </PageLayout>
  );
}
