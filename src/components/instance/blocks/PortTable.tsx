import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { getInstance, updateInstance } from "@/utils/instanceApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Iparams } from "../InstanceContent";

type Port = {
  id?: string;
  host: number;
  internal: number;
  protocol?: string;
};

const PortTable = ({ params }: { params: Iparams }) => {
  const { slug, islug } = params;

  const [ports, setPorts] = useState<Port[]>([]);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    host: "",
    internal: "",
  });

  const fetchPorts = async () => {
    if (!slug || !islug) return;

    const res = await getInstance(slug, islug);
    setPorts(res?.ports ?? []);
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  const handleSavePort = async () => {
    if (!slug || !islug) {
      toast.error("Invalid route");
      return;
    }

    const host = Number(form.host);
    const internal = Number(form.internal);

    if (
      !Number.isInteger(host) ||
      !Number.isInteger(internal) ||
      host < 1 ||
      internal < 1 ||
      host > 65535 ||
      internal > 65535
    ) {
      toast.error("Port must be between 1 and 65535");
      return;
    }

    const payload = {
      ports: [
        {
          ...(editingId ? { id: editingId } : {}),
          host,
          internal,
        },
      ],
    };

    try {
      await toast.promise(updateInstance(slug, islug, payload), {
        loading: editingId ? "Updating port..." : "Creating port...",
        success: editingId ? "Port updated" : "Port created",
        error: "Failed to save port",
      });

      setForm({ host: "", internal: "" });
      setCreating(false);
      setEditingId(null);
      fetchPorts();
    } catch (err) {
      console.error(err);
    }
  };
  if (!ports.length && !creating) {
    return (
      <div className="rounded-md border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">No ports configured</p>
        <Button size="sm" className="mt-3" onClick={() => setCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Port
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end p-3">
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Port
        </Button>
      </div>
      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="w-10">
                <Checkbox />
              </TableHead>
              <TableHead>Host Port</TableHead>
              <TableHead>Internal Port</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* CREATE / EDIT ROW */}
            {(creating || editingId) && (
              <TableRow className="h-10 bg-muted/40">
                <TableCell />
                <TableCell>
                  <Input
                    type="number"
                    min={1}
                    max={65535}
                    className="h-7"
                    placeholder="5000"
                    value={form.host}
                    onChange={(e) => setForm({ ...form, host: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={1}
                    max={65535}
                    className="h-7"
                    placeholder="3000"
                    value={form.internal}
                    onChange={(e) =>
                      setForm({ ...form, internal: e.target.value })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px]">
                    TCP
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={handleSavePort}>
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            )}

            {/* EXISTING PORTS */}
            {ports.map((port) => (
              <TableRow key={`${port.host}-${port.internal}`} className="h-10">
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell className="font-mono text-sm">{port.host}</TableCell>

                <TableCell className="font-mono text-sm text-muted-foreground">
                  {port.internal}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary" className="text-[10px] uppercase">
                    {port.protocol ?? "tcp"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => {
                        setEditingId(port.id ?? null);
                        setForm({
                          host: String(port.host),
                          internal: String(port.internal),
                        });
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PortTable;
