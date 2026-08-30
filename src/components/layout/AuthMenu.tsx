"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User, X } from "lucide-react";
import type { UserRole } from "@/types/auth";

type AuthMode = "change-password";

interface ApiResponse {
  ok: boolean;
  message: string;
}

interface SessionResponse {
  authenticated: boolean;
  user?: {
    username: string;
    role: UserRole;
  };
}

export function AuthMenu() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<AuthMode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const refreshSession = async () => {
    try {
      const response = await fetch("/api/auth/session", {
        method: "GET",
        cache: "no-store",
      });
      const data = (await response.json()) as SessionResponse;
      setIsAuthenticated(data.authenticated);
      setIsAdmin(data.user?.role === "admin");
    } catch {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  const closeDialog = () => {
    setActiveMode(null);
    setMessage(null);
    setIsLoading(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setIsLoading(false);
      setIsMenuOpen(false);
      router.replace("/login");
    }
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
        setCurrentPassword("");
        setNewPassword("");
        if (endpoint === "/api/auth/change-password") {
          await refreshSession();
        }
      }
    } catch {
      setMessage("Fehler bei der Anfrage.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => {
            if (!isMenuOpen) {
              void refreshSession();
            }
            setIsMenuOpen((prev) => !prev);
          }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors"
          aria-label="Benutzermenü öffnen"
          title="Benutzerkonto"
        >
          <User size={20} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
            {!isAuthenticated && (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/login");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                Anmelden
              </button>
            )}
            {isAuthenticated && (
              <>
                {isAdmin && (
                  <>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/admin/users");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      Benutzerverwaltung
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/admin/medical-terms");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      Fachbegriffe verwalten
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    void logout();
                  }}
                  disabled={isLoading}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-60"
                >
                  Abmelden
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
              </>
            )}
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
                Passwort ändern
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
                void callAuthApi("/api/auth/change-password", {
                  currentPassword,
                  newPassword,
                });
              }}
            >
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {isLoading ? "Bitte warten..." : "Passwort ändern"}
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
