import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchGitMenifest } from "@/utils/gitproviderApi";
import { useEffect, useState } from "react";
import { FaGithub, FaGithubAlt } from "react-icons/fa6";

export function CreateGithubAppDialog() {
  const [menifest, setMenifest] = useState("");

  const fetchMenifest = async () => {
    const res = await fetchGitMenifest();
    console.log(res.menifest);
    setMenifest(JSON.stringify(res.menifest));
  };
  const githubCreateAppUrl =
    "https://github.com/settings/apps/new?state=abc123";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button onClick={() => fetchMenifest()} variant="outline">
          <FaGithub size={30} />
          Create Github App
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={githubCreateAppUrl} method="post" target="_blank">
            <input type="hidden" name="manifest" value={menifest} />

            <AlertDialogAction type="submit">Create App</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
