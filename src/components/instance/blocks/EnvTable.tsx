import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2, Plus } from "lucide-react"

import { getInstance, updateInstance } from "@/utils/instanceApi"
import type { Iparams } from "../InstanceContent"

/* ---------------- types ---------------- */

type EnvRow = {
  key: string
  value: string
}

type UpdateField = keyof EnvRow

/* ---------------- component ---------------- */

const EnvTable = ({ params }: { params: Iparams }) => {
  const [rows, setRows] = useState<EnvRow[]>([])
  const isInitialLoad = useRef(true)
  const saveTimeout = useRef<NodeJS.Timeout | null>(null)

  /* ---------- load existing env ---------- */
  useEffect(() => {
    getInstance(params.slug, params.islug).then((instance) => {
      const env: Record<string, string> =
        instance?.enviorement ?? {}

      setRows(
        Object.entries(env).map(([key, value]) => ({
          key,
          value,
        })),
      )

      isInitialLoad.current = false
    })
  }, [params.slug, params.islug])

  /* ---------- autosave (debounced) ---------- */
  useEffect(() => {
    if (isInitialLoad.current) return

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current)
    }

    saveTimeout.current = setTimeout(() => {
      const enviorement: Record<string, string> = rows.reduce(
        (acc, cur) => {
          if (cur.key.trim()) acc[cur.key] = cur.value
          return acc
        },
        {} as Record<string, string>,
      )

      updateInstance(params.slug, params.islug, { enviorement })
    }, 500)

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current)
      }
    }
  }, [rows])

  /* ---------- row actions ---------- */

  const updateRow = (
    index: number,
    field: UpdateField,
    value: string,
  ) => {
    setRows((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const addRow = () => {
    setRows((prev) => [...prev, { key: "", value: "" }])
  }

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  /* ---------- UI ---------- */

  return (
    <div className="space-y-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>
                <Input
                  placeholder="ENV_KEY"
                  value={row.key}
                  onChange={(e) =>
                    updateRow(i, "key", e.target.value)
                  }
                />
              </TableCell>

              <TableCell>
                <Input
                  placeholder="value"
                  value={row.value}
                  onChange={(e) =>
                    updateRow(i, "value", e.target.value)
                  }
                />
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRow(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant="outline" onClick={addRow}>
        <Plus className="w-4 h-4 mr-2" />
        Add env
      </Button>
    </div>
  )
}

export default EnvTable

