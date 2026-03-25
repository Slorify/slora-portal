import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { writeStartup } from "@/lib/checkStartup";
import { registerAuth } from "@/utils/authApi";

export const Route = createFileRoute("/startup/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [step, setStep] = useState(1);

  const [proxy, setProxy] = useState("");
  const [dockerMode, setDockerMode] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [port, setPort] = useState(4612);

  const next = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  const finish = async () => {
    if (!username || !password) return;
    const proxyMode = domain !== "" ? "DOMAIN" : "PORT";
    const swarmMode = dockerMode === "Docker Swarm Mode" ? true : false;
    await registerAuth({ email, username, password });
    await writeStartup({ email, proxyMode, swarmMode, domain, port });
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Server Startup Setup</CardTitle>
          <CardDescription>
            Configure your panel before first use
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Progress value={(step / 3) * 100} />

          {/* Step 1: Proxy */}
          {step === 1 && (
            <form onSubmit={next} className="space-y-4">
              <Label>Proxy Mode</Label>
              <RadioGroup value={proxy} onValueChange={setProxy}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="domain" id="domain" />
                  <Label htmlFor="domain">
                    Use Domain Proxy (nginx / cloudflare)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="port" id="port" />
                  <Label htmlFor="port">Expose Port Only</Label>
                </div>
              </RadioGroup>

              {proxy === "domain" && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="domainInput">Domain</Label>
                  <Input
                    id="domainInput"
                    placeholder="dash.yourdomain.net"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    required={proxy === "domain"}
                  />
                </div>
              )}

              {proxy === "port" && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="portInput">Port</Label>
                  <Input
                    id="portInput"
                    type="number"
                    min={1}
                    max={65535}
                    placeholder="8080"
                    value={port}
                    onChange={(e) => setPort(Number(e.target.value))}
                    required={proxy === "port"}
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={
                  !proxy ||
                  (proxy === "domain" && !domain) ||
                  (proxy === "port" && !port)
                }
              >
                Continue
              </Button>
            </form>
          )}

          {/* Step 2: Docker Mode */}
          {step === 2 && (
            <div className="space-y-4">
              <Label>Docker Mode</Label>
              <RadioGroup value={dockerMode} onValueChange={setDockerMode}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="docker" id="docker" />
                  <Label htmlFor="docker">Normal Docker Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="swarm" id="swarm" />
                  <Label htmlFor="swarm">Docker Swarm Mode</Label>
                </div>
              </RadioGroup>

              <div className="flex gap-3">
                <Button variant="secondary" onClick={back}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={next}
                  disabled={!dockerMode}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Admin */}
          {step === 3 && (
            <div className="space-y-4">
              <Label>Admin Email</Label>
              <Input
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Label>Admin Username</Label>
              <Input
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <Label>Admin Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex gap-3">
                <Button variant="secondary" onClick={back}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={finish}
                  disabled={!username || !password}
                >
                  Create Admin & Finish
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
