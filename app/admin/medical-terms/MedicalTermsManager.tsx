"use client";

import { useCallback, useEffect, useState } from "react";

interface MedicalTerm {
  id: number;
  term: string;
}

interface ApiResponse {
  ok: boolean;
  message: string;
}

export function MedicalTermsManager() {
  const [terms, setTerms] = useState<MedicalTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTerm, setNewTerm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<MedicalTerm | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadTerms = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch("/api/admin/medical-terms", { cache: "no-store" });
      if (!response.ok) {
        const data = (await response.json()) as ApiResponse;
        setErrorMessage(data.message || "Fachbegriffe konnten nicht geladen werden.");
        setTerms([]);
        return;
      }
      const data = (await response.json()) as MedicalTerm[];
      setTerms(data);
    } catch {
      setErrorMessage("Fachbegriffe konnten nicht geladen werden.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void loadTerms();
    }, 0);
    return () => clearTimeout(timeout);
  }, [loadTerms]);

  useEffect(() => {
    if (!message) {
      return;
    }
    const timeout = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Fachbegriffe</h1>
        {!isCreateOpen && (
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Begriff hinzufügen
          </button>
        )}
      </div>

      {message && <p className="mb-4 text-sm text-green-700 dark:text-green-400">{message}</p>}
      {errorMessage && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>}

      {isCreateOpen && (
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              setIsSaving(true);
              setErrorMessage(null);
              void fetch("/api/admin/medical-terms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ term: newTerm }),
              })
                .then((response) => response.json() as Promise<ApiResponse>)
                .then(async (data) => {
                  if (data.ok) {
                    setMessage(`${newTerm.trim()} wurde hinzugefügt.`);
                    setNewTerm("");
                    setIsCreateOpen(false);
                    await loadTerms();
                  } else {
                    setErrorMessage(data.message);
                  }
                })
                .catch(() => {
                  setErrorMessage("Fehler bei der Anfrage.");
                })
                .finally(() => setIsSaving(false));
            }}
          >
            <div>
              <label
                htmlFor="medical-term-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Fachbegriff
              </label>
              <input
                id="medical-term-input"
                type="text"
                value={newTerm}
                onChange={(event) => setNewTerm(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                required
                maxLength={120}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {isSaving ? "Bitte warten..." : "Hinzufügen"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewTerm("");
                  setErrorMessage(null);
                  setIsCreateOpen(false);
                }}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      {pendingDelete && (
        <div className="mb-6 border border-red-200 dark:border-red-700 rounded-lg p-4 bg-red-50/60 dark:bg-red-900/20">
          <p className="text-sm text-gray-900 dark:text-gray-100 mb-3">
            Fachbegriff &bdquo;{pendingDelete.term}&ldquo; wirklich löschen?
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
                const response = await fetch(`/api/admin/medical-terms/${pendingDelete.id}`, {
                  method: "DELETE",
                });
                const data = (await response.json()) as ApiResponse;
                if (data.ok) {
                  setMessage(data.message);
                  setPendingDelete(null);
                  await loadTerms();
                } else {
                  setErrorMessage(data.message);
                }
                setIsDeleting(false);
              }}
              className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              disabled={isDeleting}
            >
              {isDeleting ? "Bitte warten..." : "Fachbegriff löschen"}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 text-gray-900 dark:text-gray-100">Begriff</th>
              <th className="text-left py-2 text-gray-900 dark:text-gray-100">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2} className="py-4 text-gray-600 dark:text-gray-300">
                  Lade Fachbegriffe...
                </td>
              </tr>
            ) : terms.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-4 text-gray-600 dark:text-gray-300">
                  Keine Fachbegriffe vorhanden.
                </td>
              </tr>
            ) : (
              terms.map((term) => (
                <tr key={term.id} className="border-b border-gray-100 dark:border-gray-700/70">
                  <td className="py-2 text-gray-800 dark:text-gray-200">{term.term}</td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => setPendingDelete(term)}
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Löschen
                    </button>
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

