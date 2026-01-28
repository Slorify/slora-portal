import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings/proxy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/settings/proxy/"!</div>
}
