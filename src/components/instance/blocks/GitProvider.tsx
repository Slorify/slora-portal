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
import { getGitRepoByInstance, updateGitUrl } from "@/utils/instanceApi";
import toast from "react-hot-toast";
import type { Iparams } from "../InstanceContent";
import { Link } from "@tanstack/react-router";

const GitProvider = ({ params }: { params: Iparams }) => {
  const { slug, islug } = params;

  const [apps, setApps] = useState<any[]>([]);
  const [repos, setRepos] = useState<any[]>([]);

  const [selectedAppId, setSelectedAppId] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const [branch, setBranch] = useState("");

  const [initialAppId, setInitialAppId] = useState("");
  const [initialRepo, setInitialRepo] = useState("");

  const [repoSearch, setRepoSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [hydratingGit, setHydratingGit] = useState(true);
  const [hydratingRepos, setHydratingRepos] = useState(false);

  useEffect(() => {
    const loadApps = async () => {
      setLoading(true);
      const res = await fetchGitApps();
      setApps(res || []);
      setLoading(false);
    };
    loadApps();
  }, []);

  const installedApps = useMemo(
    () => apps.filter((app) => app.isInstalled),
    [apps],
  );

  useEffect(() => {
    if (!slug || !islug) return;

    const loadExistingGit = async () => {
      try {
        setHydratingGit(true);

        const gitRepo = await getGitRepoByInstance(String(slug), String(islug));

        if (!gitRepo) return;

        const appId = String(gitRepo.appId);

        setSelectedAppId(appId);
        setInitialAppId(appId);

        setSelectedRepo({ full_name: gitRepo.repo });
        setInitialRepo(gitRepo.repo);
      } catch (err) {
        console.error(err);
      } finally {
        setHydratingGit(false);
      }
    };

    loadExistingGit();
  }, [slug, islug]);

  useEffect(() => {
    if (!selectedAppId) return;

    const loadRepos = async () => {
      try {
        setHydratingRepos(true);
        const res = await fetchGitRepos(Number(selectedAppId));
        setRepos(res || []);
        setRepoSearch("");
      } finally {
        setHydratingRepos(false);
      }
    };

    loadRepos();
  }, [selectedAppId]);

  useEffect(() => {
    if (!selectedRepo || repos.length === 0) return;

    const repo = repos.find((r) => r.full_name === selectedRepo.full_name);

    if (repo) {
      setSelectedRepo(repo);
      setBranch(repo.default_branch || "");
    }
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (!repoSearch) return repos;
    return repos.filter((repo) =>
      repo.full_name.toLowerCase().includes(repoSearch.toLowerCase()),
    );
  }, [repoSearch, repos]);

  const isModified =
    selectedAppId !== initialAppId || selectedRepo?.full_name !== initialRepo;

  const handleRepoSelect = (value: string) => {
    const repo = repos.find((r) => r.full_name === value);
    setSelectedRepo(repo || null);
    setBranch(repo?.default_branch || "");
  };

  const handleSave = async () => {
    if (!selectedRepo || !isModified) return;

    try {
      setSaving(true);

      await updateGitUrl(
        String(slug),
        String(islug),
        Number(selectedAppId),
        selectedRepo.full_name,
      );

      setInitialAppId(selectedAppId);
      setInitialRepo(selectedRepo.full_name);

      toast.success("Git repository connected successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save Git repository");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setSelectedAppId(initialAppId);
    setSelectedRepo(initialRepo ? { full_name: initialRepo } : null);
    setBranch("");
  };

  if (!loading && installedApps.length === 0) {
    return (
      <Card className="mx-auto w-9/10">
        <CardHeader className="flex items-center gap-2 font-bold">
          <FaGithub size={20} />
          GitHub Provider
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <p className="text-lg font-semibold">No GitHub provider app found</p>

          <p className="max-w-md text-sm text-muted-foreground">
            You don’t have any installed GitHub Apps yet.
          </p>

          <Button asChild>
            <Link to="/dashboard/settings/gitapps">Install GitHub App</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-9/10">
      <CardHeader className="flex items-center gap-2 font-bold">
        <FaGithub size={20} />
        GitHub Provider
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <p className="mb-2 font-semibold">GitHub Account</p>
          <Select
            value={selectedAppId}
            onValueChange={setSelectedAppId}
            disabled={loading || saving || hydratingGit}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose GitHub App" />
            </SelectTrigger>
            <SelectContent>
              {installedApps.map((app) => (
                <SelectItem key={app.id} value={String(app.app_id)}>
                  {app.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full gap-5">
          <div className="w-1/2">
            <p className="mb-2 font-semibold">Repository</p>
            <Select
              value={selectedRepo?.full_name}
              onValueChange={handleRepoSelect}
              disabled={
                !selectedAppId || saving || hydratingGit || hydratingRepos
              }
            >
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

          <div className="w-1/2">
            <p className="mb-2 font-semibold">Branch</p>
            <Input value={branch} placeholder="Default branch" disabled />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={!isModified || saving}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={!isModified || saving || !selectedRepo}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitProvider;
