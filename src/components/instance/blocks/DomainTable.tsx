import { useEffect, useState } from "react";
import { Plus, Trash2, Globe, ShieldCheck, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInstance, updateInstance } from "@/utils/instanceApi";
import type { Iparams } from "../InstanceContent";

type DomainRow = {
  id?: number;
  name: string;
  domain: string;
  port: number;
};

const DomainTable = ({ params }: { params: Iparams }) => {
  const { slug, islug } = params;

  const [domains, setDomains] = useState<DomainRow[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    domain: "",
    port: "80",
  });

  const fetchDomains = async () => {
    try {
      const instance = await getInstance(slug, islug);
      setDomains(instance?.domains ?? []);
    } catch {
      toast.error("Failed to load domains");
    }
  };

  useEffect(() => {
    fetchDomains();
  }, [slug, islug]);

  const handleAddDomain = async () => {
    if (!form.name.trim() || !form.domain.trim()) {
      toast.error("Name and domain are required");
      return;
    }

    const port = Number(form.port || "80");
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      toast.error("Port must be between 1 and 65535");
      return;
    }

    setLoading(true);
    try {
      await toast.promise(
        updateInstance(slug, islug, {
          domains: [
            {
              name: form.name.trim(),
              domain: form.domain.trim(),
              port,
            },
          ],
        }),
        {
          loading: "Adding domain...",
          success: "Domain added",
          error: (err: any) =>
            err?.message ?? err?.messsage ?? "Failed to add domain",
        },
      );

      setForm({ name: "", domain: "", port: "80" });
      setIsAdding(false);
      fetchDomains();
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDomain = (row: DomainRow) => {
    // Current backend update endpoint does not expose domain deletion.
    // Keep UX explicit and immediate by removing from table state.
    setDomains((prev) => prev.filter((d) => d.id !== row.id));
    toast.success(`Removed ${row.domain} from UI`);
  };

  const domainHref = (domain: string) => {
    if (domain.startsWith("http://") || domain.startsWith("https://")) {
      return domain;
    }
    return `https://${domain}`;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Globe className="h-4 w-4" />
          Domain Routing
        </CardTitle>
        <CardDescription>
          Map custom domains to this instance for HTTP/HTTPS traffic.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="gap-1">
            <ShieldCheck className="h-3 w-3" />
            TLS via proxy
          </Badge>

          <Button size="sm" onClick={() => setIsAdding((v) => !v)}>
            <Plus className="mr-2 h-4 w-4" />
            {isAdding ? "Cancel" : "Add Domain"}
          </Button>
        </div>

        {isAdding && (
          <div className="grid gap-3 rounded-md border p-3 md:grid-cols-4">
            <Input
              placeholder="Name (e.g. app)"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
            <Input
              placeholder="Domain (e.g. app.example.com)"
              value={form.domain}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, domain: e.target.value }))
              }
            />
            <Input
              type="number"
              min={1}
              max={65535}
              placeholder="80"
              value={form.port}
              onChange={(e) => setForm((prev) => ({ ...prev, port: e.target.value }))}
            />
            <Button disabled={loading} onClick={handleAddDomain}>
              Save
            </Button>
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Port</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No domains configured
                  </TableCell>
                </TableRow>
              )}

              {domains.map((row) => (
                <TableRow key={row.id ?? `${row.domain}-${row.port}`}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="font-mono text-sm">{row.domain}</TableCell>
                  <TableCell>{row.port}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <a
                          href={domainHref(row.domain)}
                          target="_blank"
                          rel="noreferrer noopener"
                          title="Open domain"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemoveDomain(row)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainTable;
