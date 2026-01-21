import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { AppWindowIcon, CodeIcon, FileText, ShieldUser } from "lucide-react";
import GitProvider from "./blocks/GitProvider";

export function InstanceContent() {
  return (
    <Tabs defaultValue="preview">
      <TabsList className="bg-sidebar w-full">
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Setup
        </TabsTrigger>
        <TabsTrigger value="console">
          <CodeIcon />
          Console
        </TabsTrigger>
        <TabsTrigger value="enviornment">
          <FileText />
          Environment
        </TabsTrigger>
        <TabsTrigger value="advanced">
          <ShieldUser />
          Advanced
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <GitProvider />
      </TabsContent>
    </Tabs>
  );
}
