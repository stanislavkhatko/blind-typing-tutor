"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminUsersForm } from "./AdminUsersForm";
import { USER_ROLE_LABELS, type UserRole } from "@/types/auth";

interface AdminUser {
  id: number;
  username: string;
  role: UserRole;
}

export function AdminUsersManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
      const data = (await response.json()) as AdminUser[];
      setUsers(data);
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

      {errorMessage && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 text-gray-900 dark:text-gray-100">Benutzername</th>
              <th className="text-left py-2 text-gray-900 dark:text-gray-100">Rolle</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2} className="py-4 text-gray-600 dark:text-gray-300">
                  Lade Benutzer...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-4 text-gray-600 dark:text-gray-300">
                  Keine Benutzer gefunden.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700/70">
                  <td className="py-2 text-gray-800 dark:text-gray-200">{user.username}</td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">{USER_ROLE_LABELS[user.role]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
