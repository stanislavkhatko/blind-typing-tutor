"use client";

import { FormEvent, useState } from "react";
import { USER_ROLE_LABELS, type UserRole } from "@/types/auth";

interface ApiResponse {
  ok: boolean;
  message: string;
}

interface AdminUsersFormProps {
  onCancel: () => void;
  onSuccess: (message: string) => void;
}

export function AdminUsersForm({ onCancel, onSuccess }: AdminUsersFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setRole("user");
    setMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (password !== passwordConfirm) {
      setMessage("Passwörter stimmen nicht überein.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });
      const data = (await response.json()) as ApiResponse;
      if (data.ok) {
        resetForm();
        onSuccess("Benutzer wurde erfolgreich angelegt.");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Fehler bei der Anfrage.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
      <div>
        <label
          htmlFor="admin-create-username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Benutzername
        </label>
        <input
          id="admin-create-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          required
          autoComplete="username"
        />
      </div>
      <div>
        <label
          htmlFor="admin-create-password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Passwort
        </label>
        <input
          id="admin-create-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          required
          autoComplete="new-password"
        />
      </div>
      <div>
        <label
          htmlFor="admin-create-password-confirm"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Passwort bestätigen
        </label>
        <input
          id="admin-create-password-confirm"
          type="password"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          required
          autoComplete="new-password"
        />
      </div>
      <div>
        <label
          htmlFor="admin-create-role"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Rolle
        </label>
        <select
          id="admin-create-role"
          value={role}
          onChange={(event) => setRole(event.target.value as UserRole)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          <option value="user">{USER_ROLE_LABELS.user}</option>
          <option value="admin">{USER_ROLE_LABELS.admin}</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {isLoading ? "Bitte warten..." : "Benutzer anlegen"}
        </button>
        <button
          type="button"
          onClick={() => {
            resetForm();
            onCancel();
          }}
          className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Abbrechen
        </button>
      </div>

      {message && <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>}
    </form>
  );
}
