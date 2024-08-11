import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/UserContext"; // Adjust path based on your project structure

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://in-telli-ventory.onrender.com/users/login",
        { email, password }
      );
      console.log("Login successful:", response.data);

      setUser({
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        email: response.data.email,
        role: response.data.role, // Assuming the response includes the user's role
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setError(error.response.data || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-full mt-52 ">
      <Card className="w-2/6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email: neo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="pass: 1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
