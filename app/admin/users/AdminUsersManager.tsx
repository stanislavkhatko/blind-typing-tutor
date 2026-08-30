"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminUsersForm } from "./AdminUsersForm";
import { USER_ROLE_LABELS, type UserRole } from "@/types/auth";

interface AdminUser {
  id: number;
  username: string;
  role: UserRole;
}

interface AdminUsersResponse {
  users: AdminUser[];
  currentUserId: number;
}

export function AdminUsersManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<AdminUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch("/api/admin/users", { cache: "no-store" });
      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage("Bitte zuerst einloggen.");
        } else if (response.status === 403) {
          setErrorMessage("Keine Berechtigung.");
        } else {
          setErrorMessage("Benutzerliste konnte nicht geladen werden.");
        }
        setUsers([]);
        return;
      }
      const data = (await response.json()) as AdminUsersResponse;
      setUsers(data.users);
      setCurrentUserId(data.currentUserId);
    } catch {
      setErrorMessage("Benutzerliste konnte nicht geladen werden.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void loadUsers();
    }, 0);
    return () => clearTimeout(timeout);
  }, [loadUsers]);

  useEffect(() => {
    if (!successMessage) {
      return;
    }
    const timeout = setTimeout(() => {
      setSuccessMessage(null);
    }, 3500);
    return () => clearTimeout(timeout);
  }, [successMessage]);

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Benutzerverwaltung</h1>
        {!isCreateOpen && (
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Benutzer anlegen
          </button>
        )}
      </div>

      {successMessage && (
        <p className="mb-4 text-sm text-green-700 dark:text-green-400">{successMessage}</p>
      )}

      {isCreateOpen && (
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <AdminUsersForm
            onCancel={() => setIsCreateOpen(false)}
            onSuccess={async (message) => {
              setSuccessMessage(message);
              setIsCreateOpen(false);
              await loadUsers();
            }}
          />
        </div>
      )}

      {pendingDelete && (
        <div className="mb-6 border border-red-200 dark:border-red-700 rounded-lg p-4 bg-red-50/60 dark:bg-red-900/20">
          <p className="text-sm text-gray-900 dark:text-gray-100 mb-3">
            Benutzer &bdquo;{pendingDelete.username}&ldquo; wirklich löschen?
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPendingDelete(null)}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={isDeleting}
            >
              Abbrechen
            </button>
            <button
              type="button"
              onClick={async () => {
                setIsDeleting(true);
                setErrorMessage(null);
                const response = await fetch(`/api/admin/users/${pendingDelete.id}`, {
                  method: "DELETE",
                });
                const data = (await response.json()) as { ok: boolean; message: string };
                if (data.ok) {
                  setSuccessMessage(data.message);
                  setPendingDelete(null);
                  await loadUsers();
                } else {
                  setErrorMessage(data.message);
                }
                setIsDeleting(false);
              }}
              className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              disabled={isDeleting}
            >
              {isDeleting ? "Bitte warten..." : "Benutzer löschen"}
            </button>
          </div>
        </div>
      )}

      {errorMessage && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 text-gray-900 dark:text-gray-100">Benutzername</th>
              <th className="text-left py-2 text-gray-900 dark:text-gray-100">Rolle</th>
              <th className="text-left py-2 text-gray-900 dark:text-gray-100">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="py-4 text-gray-600 dark:text-gray-300">
                  Lade Benutzer...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-gray-600 dark:text-gray-300">
                  Keine Benutzer gefunden.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700/70">
                  <td className="py-2 text-gray-800 dark:text-gray-200">{user.username}</td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">{USER_ROLE_LABELS[user.role]}</td>
                  <td className="py-2">
                    {currentUserId === user.id ? (
                      <span className="text-xs text-gray-500 dark:text-gray-400">Aktueller Benutzer</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPendingDelete(user)}
                        className="text-sm text-red-600 dark:text-red-400 hover:underline"
                        aria-label="Benutzer löschen"
                      >
                        Löschen
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
