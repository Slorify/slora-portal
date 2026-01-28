import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { AppWindowIcon, CodeIcon, FileText, ShieldUser } from "lucide-react";
import GitProvider from "./blocks/GitProvider";
import AppConsole from "./blocks/AppConsole";
import PortTable from "./blocks/PortTable";

export interface Iparams {
  slug: string;
  islug: string;
}

export function InstanceContent({ params }: { params: Iparams }) {
  return (
    <Tabs defaultValue="preview">
      <TabsList className="bg-card w-full">
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
        <TabsTrigger value="ports">
          <FileText />
          Ports
        </TabsTrigger>
        <TabsTrigger value="domains">
          <FileText />
          Domains
        </TabsTrigger>
        <TabsTrigger value="advanced">
          <ShieldUser />
          Advanced
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <GitProvider params={params} />
      </TabsContent>
      <TabsContent value="console">
        <AppConsole params={params} />
      </TabsContent>
      <TabsContent className="p-5" value="ports">
        <PortTable params={params} />
      </TabsContent>
    </Tabs>
  );
}
