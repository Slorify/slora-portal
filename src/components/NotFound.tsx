import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="text-8xl text-primary font-extrabold ">404</h1>
      <p className="text-base-content/60 text-4xl font-bold">
        Ops! Page not found
      </p>
      <Button className="scale-120 mt-6" onClick={() => navigate("/")}>
        Go Back
      </Button>
    </main>
  );
};

export default NotFound;
