
import React, { useState } from 'react';
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { login, signup } from "@/services/mockDataService";
import { useToast } from "@/hooks/use-toast";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onLogin: (user: any) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showAuth, setShowAuth] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await login(email, password);
      onLogin(user);
      toast({ title: "Welcome back!", description: "You've successfully signed in" });
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      const user = await signup(email, password, name);
      onLogin(user);
      toast({ title: "Account created", description: "Your account has been created successfully" });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "This email may already be in use",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <NavBar onLogin={() => setShowAuth(true)} />
      
      <main className="flex-1 flex flex-col">
        {showAuth ? (
          <div className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
            <AuthForm onLogin={handleLogin} onSignup={handleSignup} />
          </div>
        ) : (
          <>
            <section className="py-16 md:py-24 container mx-auto px-4 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left md:pr-8 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text">Time Well Written</span>
                  <br />Your Daily Journal
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Capture your thoughts, memories, and reflections in a private space designed for mindful journaling.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button size="lg" onClick={() => setShowAuth(true)}>
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3"></div>
                  <div className="bg-card border rounded-2xl shadow-xl p-6 w-full max-w-md relative">
                    <div className="flex items-center mb-4">
                      <Book className="h-5 w-5 text-primary mr-2" />
                      <h2 className="font-semibold">Today's Entry</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Dear Journal,
                    </p>
                    <p className="mt-2 mb-4">
                      Today I finally started using TimeWell Journal to capture my thoughts. It's a simple yet powerful tool that helps me stay mindful and reflective...
                    </p>
                    <div className="text-xs text-right text-muted-foreground mt-4">
                      May 2, 2025 • 10:30 AM
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-12 md:py-20 bg-accent/30">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12">Why Journal with TimeWell?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-card p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Book className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Private & Secure</h3>
                    <p className="text-muted-foreground">Your thoughts stay private with strong encryption and security measures.</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Book className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Reflect & Grow</h3>
                    <p className="text-muted-foreground">Build self-awareness by capturing daily moments and tracking growth over time.</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Book className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Simple & Elegant</h3>
                    <p className="text-muted-foreground">A clean, distraction-free writing experience that makes journaling a joy.</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-12 md:py-20 container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to start your journal?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of people who use TimeWell Journal to capture moments, 
                process emotions, and document their personal journey.
              </p>
              <Button size="lg" onClick={() => setShowAuth(true)}>
                Create Your Journal
              </Button>
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
