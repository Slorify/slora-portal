import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import GitProvider from "./blocks/GitProvider";
import AppConsole from "./blocks/AppConsole";
import PortTable from "./blocks/PortTable";
import EnvTable from "./blocks/EnvTable";
import DomainTable from "./blocks/DomainTable";
import { useNavigate, useSearch } from "@tanstack/react-router";

export interface Iparams {
  slug: string;
  islug: string;
}

export function InstanceContent({ params }: { params: Iparams }) {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })

  const activeTab = (search.tab as string) ?? "preview"

  return (
    <Tabs
      value={activeTab}
      onValueChange={(tab) =>
        navigate({
          search: (prev) => ({ ...prev, tab }),
          replace: true,
        })
      }
    >
      <TabsList className="bg-card w-full">
        <TabsTrigger value="preview">Setup</TabsTrigger>
        <TabsTrigger value="console">Console</TabsTrigger>
        <TabsTrigger value="enviornment">Environment</TabsTrigger>
        <TabsTrigger value="ports">Ports</TabsTrigger>
        <TabsTrigger value="domains">Domains</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
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

      <TabsContent className="p-5" value="enviornment">
        <EnvTable params={params} />
      </TabsContent>

      <TabsContent className="p-5" value="domains">
        <DomainTable params={params} />
      </TabsContent>
    </Tabs>
  )
}
