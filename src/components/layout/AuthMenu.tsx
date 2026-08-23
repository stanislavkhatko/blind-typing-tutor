"use client";

import { useState } from "react";
import { User, X } from "lucide-react";

type AuthMode = "login" | "register" | "change-password";

interface ApiResponse {
  ok: boolean;
  message: string;
}

export function AuthMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<AuthMode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const closeDialog = () => {
    setActiveMode(null);
    setMessage(null);
    setIsLoading(false);
  };

  const callAuthApi = async (endpoint: string, payload: Record<string, string>) => {
    setIsLoading(true);
    setMessage(null);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as ApiResponse;
      setMessage(data.message);
      if (data.ok) {
        setPassword("");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch {
      setMessage("Fehler bei der Anfrage.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    if (activeMode === "login") return "Login";
    if (activeMode === "register") return "Registrieren";
    return "Passwort ändern";
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors"
          aria-label="Benutzermenü öffnen"
          title="Benutzerkonto"
        >
          <User size={20} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
            <button
              onClick={() => {
                setActiveMode("login");
                setIsMenuOpen(false);
                setMessage(null);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveMode("register");
                setIsMenuOpen(false);
                setMessage(null);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            >
              Registrieren
            </button>
            <button
              onClick={() => {
                setActiveMode("change-password");
                setIsMenuOpen(false);
                setMessage(null);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            >
              Passwort ändern
            </button>
          </div>
        )}
      </div>

      {activeMode && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4"
          onClick={closeDialog}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getTitle()}
              </h2>
              <button
                onClick={closeDialog}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                aria-label="Dialog schließen"
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (activeMode === "login") {
                  void callAuthApi("/api/auth/login", { username, password });
                  return;
                }
                if (activeMode === "register") {
                  void callAuthApi("/api/auth/register", { username, password });
                  return;
                }
                void callAuthApi("/api/auth/change-password", {
                  username,
                  currentPassword,
                  newPassword,
                });
              }}
            >
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Benutzername"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                required
              />

              {activeMode !== "change-password" && (
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Passwort"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  required
                />
              )}

              {activeMode === "change-password" && (
                <>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    placeholder="Aktuelles Passwort"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    required
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="Neues Passwort"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    required
                  />
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {isLoading ? "Bitte warten..." : getTitle()}
              </button>
            </form>

            {message && (
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{message}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
