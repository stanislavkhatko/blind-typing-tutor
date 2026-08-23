"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Keyboard as KeyboardIcon } from "lucide-react";

type Mode = "login" | "register";

interface ApiResponse {
  ok: boolean;
  message: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as ApiResponse;
      setMessage(data.message);
      if (data.ok) {
        if (mode === "login") {
          router.push("/");
        } else {
          setMode("login");
          setUsername("");
          setPassword("");
        }
      }
    } catch {
      setMessage("Fehler bei der Anfrage.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <KeyboardIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
            Blind Typing Tutor
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {mode === "login" ? "Anmelden" : "Registrieren"}
          </h1>

          <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Benutzername
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Benutzername"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Passwort
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 font-medium transition-colors"
            >
              {isLoading
                ? "Bitte warten..."
                : mode === "login"
                  ? "Anmelden"
                  : "Registrieren"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{message}</p>
          )}

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {mode === "login" ? (
              <>
                Noch kein Konto?{" "}
                <button
                  onClick={() => {
                    setMode("register");
                    setMessage(null);
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Registrieren
                </button>
              </>
            ) : (
              <>
                Bereits ein Konto?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setMessage(null);
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Anmelden
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
