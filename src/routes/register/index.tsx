import { RegisterForm } from "@/components/register-form";
import { ShaderRipple } from "@/components/shader-ripple";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen flex items-center justify-center relative w-full">
      <div className="w-full z-10 relative max-w-sm">
        <h1 className="text-5xl font-extrabold text-center text-primary mb-5 flex items-center gap-6 justify-center">
          <img width={80} src="/logo.png" />
          Slorify
        </h1>
        <RegisterForm />
      </div>
      <ShaderRipple
        color1="#ff0000"
        color2="#e77070"
        color3="#ff057a"
        backgroundColor="#ff9f9"
        rotation={29}
        className="absolute -z-0 inset-0 h-screen w-screen"
      />
    </div>
  );
}
