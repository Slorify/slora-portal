import TerminalConsole from '@/components/blocks/TerminalConsole'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { installProxy, logsProxy, startProxy, stopProxy } from '@/utils/proxyApi'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Play, Square, RotateCcw, Download, Terminal } from 'lucide-react'

export const Route = createFileRoute('/dashboard/settings/proxy/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [loading, setLoading] = useState<string | null>(null)

  useEffect(() => {
    logsProxy()
  }, [])

  const action = async (name: string, fn: () => Promise<any> | void) => {
    try {
      setLoading(name)
      await fn()
      logsProxy()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Proxy Manager
          </CardTitle>
          <CardDescription>
            Install and control the proxy service on your server
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="secondary"
              disabled={loading !== null}
              onClick={() => action('install', installProxy)}
            >
              <Download className="mr-2 h-4 w-4" />
              {loading === 'install' ? 'Installing…' : 'Install'}
            </Button>

            <Button
              disabled={loading !== null}
              onClick={() => action('start', startProxy)}
            >
              <Play className="mr-2 h-4 w-4" />
              {loading === 'start' ? 'Starting…' : 'Start'}
            </Button>

            <Button
              variant="destructive"
              disabled={loading !== null}
              onClick={() => action('stop', stopProxy)}
            >
              <Square className="mr-2 h-4 w-4" />
              {loading === 'stop' ? 'Stopping…' : 'Stop'}
            </Button>

            <Button
              variant="outline"
              disabled={loading !== null}
              onClick={() =>
                action('restart', async () => {
                  await stopProxy()
                  await startProxy()
                })
              }
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {loading === 'restart' ? 'Restarting…' : 'Restart'}
            </Button>
          </div>

          <Separator />

          <div className="text-sm text-muted-foreground">
            Live proxy logs
          </div>

          <TerminalConsole channel="proxy" />
        </CardContent>
      </Card>
    </div>
  )
}

