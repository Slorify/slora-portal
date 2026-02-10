import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { DeleteIcon } from "../ui/delete";
import { FingerprintIcon } from "../ui/fingerprint";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { deleteGitApp } from "@/utils/gitproviderApi";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  name: string;
  appID: number;
  installUrl?: string;
  author_name?: string;
  avatarUrl?: string;
  isInstalled: boolean;
  createdAt: string;
  refresh: () => void;
};
const GitAppCard = (props: Props) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    await toast.promise(deleteGitApp(props.appID), {
      loading: "Deleting Github Provider..",
      success: (res) => res.message,
      error: (res) => res.message,
    });
    props.refresh();
  };
  return (
    <Card className="flex justify-center md:w-8/10 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <FaGithub size={30} /> {props.name}
        </CardTitle>
        <CardDescription>{props.createdAt}</CardDescription>
        <CardAction className="flex items-center space-x-5">
          {props.isInstalled ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="scale-120">
                    <AvatarImage src={props.avatarUrl} />
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{props.author_name}</p>
                </TooltipContent>
              </Tooltip>
            </>
          ) : (
            <>
              <Badge className="text-sm">Installation Required</Badge>

              <FingerprintIcon
                onClick={() => navigate({  href: `${props.installUrl}` })}
                className="text-blue-400"
              />
            </>
          )}

          <DeleteIcon onClick={handleDelete} className="text-red-400" />
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default GitAppCard;
