// app/routes/login.tsx
import { useState } from "react"

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Apple, Lock, Mail, User, X, BadgeCheck } from "lucide-react"
import { useNavigate } from "react-router-dom";
import React from "react"

export default function LoginPage() {
    const navigate = useNavigate();

    const [mode, setMode] = useState<"login" | "signup">("login")
    const [step, setStep] = useState<"username" | "password">("username")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Signup state
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [signupPassword, setSignupPassword] = useState("")

    const handleContinue = () => {
    if (username.trim() !== "") setStep("password")
  }

  const handleLogin = () => {
  if (username === "Ossama" && password === "@ABC123") {
    console.log("Login successful");
    navigate("/home");
  } else {
    alert("Invalid username or password");
  }
}


  const handleSignup = () => {
    console.log("Signup with:", { email, name, surname, signupPassword })
    navigate("/home");
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 space-y-5">
        {/* Logo & Tabs */}
        <div className="text-center">
          <div className="font-bold text-2xl mb-2">Agenda Personnel</div>
          <div className="flex justify-center bg-zinc-100 rounded-lg p-1 mb-4">
            <Button
              variant="ghost"
              className={`${mode === "login" ? "bg-black text-white" : "text-black"} rounded-md px-4 py-1 text-sm`}
              onClick={() => {
                setMode("login")
                setStep("username")
              }}
            >
              Login
            </Button>
            <Button
              variant="ghost"
              className={`${mode === "signup" ? "bg-black text-white" : "text-black"} rounded-md px-4 py-1 text-sm`}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </Button>
          </div>
          <h2 className="text-xl font-semibold">
            {mode === "signup" ? "Create Account," : "Welcome,"}
          </h2>          
           <p className="text-sm text-muted-foreground">
            {mode === "signup" ? "Sign up to get started!" : "Sign in to continue!"}
          </p>
        </div>

        {mode === "login" && step === "username" && (
          <>
            <Card className="bg-purple-100 p-4 text-sm flex items-start gap-2 relative">
              <Lock className="w-5 h-5 mt-1 text-purple-700" />
              <div>
                <strong>Username:</strong> Ossama <br />
                <strong>Password:</strong> @ABC123
              </div>
              <X className="absolute top-2 right-2 w-4 h-4 cursor-pointer text-purple-400" />
            </Card>

            <div className="space-y-3">
              <Input
                placeholder="Your email or username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {mode === "login" && step === "password" && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-md font-medium">Hi, {username}.</h3>
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        )}

        {mode === "signup" && (
          <div className="space-y-3">
            <Input
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Your surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <Button
              className="w-full bg-indigo-500 text-white hover:bg-indigo-400"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}