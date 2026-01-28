import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/blocks/PageLayout";
import { DeleteIcon } from "@/components/ui/delete";
import { FilePenLineIcon } from "@/components/ui/file-pen-line";
import { deleteInstance, getInstance } from "@/utils/instanceApi";
import { BoxIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { InstanceContent } from "@/components/instance/InstanceContent";
import { useInstanceStatus } from "@/hooks/useInstanceStatus";
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
import toast from "react-hot-toast";

export const Route = createFileRoute("/dashboard/workspaces/$slug/$islug")({
  loader: async ({ params }) => {
    return getInstance(params.slug, params.islug);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { islug, slug } = Route.useParams();
  const params = Route.useParams();
  const instance = Route.useLoaderData();

  const { fromColor } = useInstanceStatus(`${slug}-${islug}`);
  console.log(fromColor);

  const handleDelete = async () => {
    await toast.promise(deleteInstance(String(slug), String(islug)), {
      loading: "Deleting Instance..",
      success: (res) => res.messsage,
      error: (res) => res.messsage,
    });
  };

  return (
    <PageLayout
      icon={BoxIcon}
      title={instance.name}
      description={instance.image}
      className="p-0"
      titleClassName={`bg-linear-180 ${fromColor} to-background`}
      actions={
        <>
          <div className="flex gap-5 text-muted-foreground ">
            <FilePenLineIcon className="hover:text-blue-300" size={20} />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DeleteIcon className="hover:text-red-400" size={20} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure to delete this Instance?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You really wanna delete the instance ? It can cause all your
                    data of this instance to remove instantly. Beaware to
                    recheck if you really wanna delete it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      }
    >
      <InstanceContent params={params} />
    </PageLayout>
  );
}
