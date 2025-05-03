
import React, { useState } from 'react';
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
import { useToast } from "@/hooks/use-toast";
import { Book, LogIn, UserPlus } from "lucide-react";

type AuthFormProps = {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, name: string) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && !name) {
      toast({
        title: "Missing name",
        description: "Please provide your name for signup",
        variant: "destructive",
      });
      return;
    }

    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignup(email, password, name);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/90 backdrop-blur">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <Book className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">
          {isLogin ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Enter your credentials to access your journals"
            : "Enter your information to get started"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" size="lg">
            {isLogin ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
            {isLogin ? "Sign in" : "Sign up"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-sm"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
