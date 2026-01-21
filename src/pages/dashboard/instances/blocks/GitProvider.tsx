import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { fetchGitApps, fetchGitRepos } from "@/utils/gitproviderApi";
import { FaGithub } from "react-icons/fa6";

const GitProvider = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [repos, setRepos] = useState<any[]>([]);

  const [selectedAppId, setSelectedAppId] = useState<string>("");
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const [branch, setBranch] = useState("");

  const [repoSearch, setRepoSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD APPS ---------------- */
  useEffect(() => {
    const load = async () => {
      const res = await fetchGitApps();
      setApps(res || []);
      setLoading(false);
    };
    load();
  }, []);

  /* ---------------- LOAD REPOS ON APP CHANGE ---------------- */
  useEffect(() => {
    if (!selectedAppId) return;

    const loadRepos = async () => {
      const res = await fetchGitRepos(Number(selectedAppId));
      setRepos(res || []);
      setSelectedRepo(null);
      setBranch("");
      setRepoSearch("");
    };

    loadRepos();
  }, [selectedAppId]);

  /* ---------------- LIVE SEARCH ---------------- */
  const filteredRepos = useMemo(() => {
    if (!repoSearch) return repos;
    return repos.filter((repo) =>
      repo.full_name.toLowerCase().includes(repoSearch.toLowerCase()),
    );
  }, [repoSearch, repos]);

  /* ---------------- HANDLERS ---------------- */
  const handleRepoSelect = (value: string) => {
    const repo = repos.find((r) => r.full_name === value);
    setSelectedRepo(repo);
    setBranch(repo?.default_branch || "");
  };

  const handleSave = () => {
    console.log({
      appId: selectedAppId,
      repo: selectedRepo?.full_name,
      branch,
    });
  };

  return (
    <Card className="mx-auto w-9/10">
      <CardHeader className="flex items-center gap-2 font-bold">
        <FaGithub size={20} />
        Github Provider
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <p className="mb-2 font-semibold">GitHub Account</p>
          <Select
            value={selectedAppId}
            onValueChange={setSelectedAppId}
            disabled={loading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose GitHub App" />
            </SelectTrigger>
            <SelectContent>
              {apps.map((app) => (
                <SelectItem key={app.id} value={String(app.app_id)}>
                  {app.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full gap-5 ">
          <div className="w-1/2">
            <p className="mb-2 font-semibold">Repository</p>
            <Select onValueChange={handleRepoSelect} disabled={!selectedAppId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Repository" />
              </SelectTrigger>

              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search repository..."
                    value={repoSearch}
                    onChange={(e) => setRepoSearch(e.target.value)}
                    className="h-8"
                  />
                </div>

                {filteredRepos.length === 0 && (
                  <p className="px-3 py-2 text-sm text-muted-foreground">
                    No repositories found
                  </p>
                )}

                {filteredRepos.map((repo) => (
                  <SelectItem key={repo.id} value={repo.full_name}>
                    {repo.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-1/2 ">
            <p className="mb-2 font-semibold">Branch</p>
            <Input value={branch} placeholder="Default branch" disabled />{" "}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedRepo(null);
              setBranch("");
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={!selectedAppId || !selectedRepo}
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitProvider;
