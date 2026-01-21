import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchGitApps, fetchGitRepos } from "@/utils/gitproviderApi";
import { FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const GitProvider = () => {
  const navigate = useNavigate();
  const pathname = "/dashboard/settings/gitapps";

  const [apps, setApps] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const res = await fetchGitApps();
        setApps(res.apps || []);
      } finally {
        setLoading(false);
      }
    };
    loadApps();
  }, []);

  const handleAppSelect = async (appId: string) => {
    const app = apps.find((a) => a.id === Number(appId));
    setSelectedApp(app);

    const res = await fetchGitRepos(app.app_id);
    setRepos(res.repos || []);
  };

  return (
    <Card className="w-7/9 self-center mx-auto">
      <CardHeader className="flex gap-2 font-bold items-center">
        <FaGithub size={20} />
        Github Providers
      </CardHeader>

      <CardContent>
        {/* LOADING */}
        {loading && <p className="text-muted-foreground">Loading...</p>}

        {/* EMPTY STATE */}
        {!loading && apps.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderGit2 />
              </EmptyMedia>
              <EmptyTitle>No Git providers found.</EmptyTitle>
              <EmptyDescription>
                You haven't created any Github Provider App. Click below to
                create one.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={() => navigate(pathname)} variant="link">
                Git Providers Settings
              </Button>
            </EmptyContent>
          </Empty>
        )}

        {/* APP + REPO SELECT */}
        {!loading && apps.length > 0 && (
          <div className="grid grid-cols-2 gap-6">
            {/* APP SELECT */}
            <div>
              <p className="mb-2 font-semibold">Select Git App</p>
              <Select onValueChange={handleAppSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose GitHub App" />
                </SelectTrigger>
                <SelectContent>
                  {apps.map((app) => (
                    <SelectItem key={app.id} value={String(app.id)}>
                      {app.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* REPO SELECT */}
            {selectedApp && (
              <div>
                <p className="mb-2 font-semibold">Select Repository</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Repository" />
                  </SelectTrigger>
                  <SelectContent>
                    {repos.map((repo: any) => (
                      <SelectItem key={repo.id} value={repo.full_name}>
                        {repo.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GitProvider;
