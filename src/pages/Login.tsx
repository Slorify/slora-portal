import { LoginForm } from "@/components/login-form";
import { ShaderRipple } from "@/components/shader-ripple";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center relative w-full">
      <div className="w-full z-10 relative max-w-sm">
        <h1 className="text-6xl font-extrabold text-center">Ember Labs</h1>
        <LoginForm />
      </div>
      <ShaderRipple
        color1="#ff0000"
        color2="#e77070"
        color3="#ff057a"
        className="absolute -z-0 inset-0 h-screen w-screen"
      />
    </div>
  );
};

export default Login;
