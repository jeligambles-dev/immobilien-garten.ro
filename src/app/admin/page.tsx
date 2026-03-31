"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Lock,
  LogOut,
  Upload,
  Trash2,
  Plus,
  Save,
  X,
  ImageIcon,
  FolderOpen,
  Pencil,
} from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  createdAt: string;
}

interface UploadedImage {
  filename: string;
  url: string;
}

const categories = [
  "Gazon",
  "Pomi & Arbuști",
  "Gard Viu",
  "Plantări",
  "Irigații",
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"portfolio" | "images">("portfolio");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function login() {
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadData();
    } else {
      setError("Parolă incorectă");
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
  }

  async function loadData() {
    const [portfolioRes, imagesRes] = await Promise.all([
      fetch("/api/admin/portfolio"),
      fetch("/api/admin/images"),
    ]);
    if (portfolioRes.ok) setItems(await portfolioRes.json());
    if (imagesRes.ok) setImages(await imagesRes.json());
  }

  async function uploadImage(file: File) {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/images", { method: "POST", body: form });
    if (res.ok) {
      const data = await res.json();
      setImages((prev) => [...prev, data]);
      setUploading(false);
      return data.url as string;
    }
    setUploading(false);
    return null;
  }

  async function deleteImage(filename: string) {
    await fetch("/api/admin/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    setImages((prev) => prev.filter((i) => i.filename !== filename));
  }

  async function saveItem(item: PortfolioItem) {
    const isNew = !items.find((i) => i.id === item.id);
    const res = await fetch("/api/admin/portfolio", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (res.ok) {
      await loadData();
      setEditing(null);
    }
  }

  async function deleteItem(id: string) {
    await fetch("/api/admin/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  // Check auth on mount
  useEffect(() => {
    fetch("/api/admin/images").then((r) => {
      if (r.ok) {
        setAuthed(true);
        loadData();
      }
    });
  }, []);

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="h-14 w-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <Lock className="h-7 w-7" />
              </div>
            </div>
            <h1 className="font-heading font-bold text-slate-900 text-xl text-center mb-6">
              Admin Panel
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolă admin"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-xs mb-3">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Autentificare
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <h1 className="font-heading font-bold text-slate-900">
            Admin Panel
          </h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Deconectare
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("portfolio")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
              tab === "portfolio"
                ? "bg-green-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <FolderOpen className="h-4 w-4" />
            Portofoliu
          </button>
          <button
            onClick={() => setTab("images")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
              tab === "images"
                ? "bg-green-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            Imagini ({images.length})
          </button>
        </div>

        {/* Portfolio Tab */}
        {tab === "portfolio" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-slate-900">
                Proiecte Portofoliu
              </h2>
              <button
                onClick={() =>
                  setEditing({
                    id: "new-" + Date.now(),
                    title: "",
                    category: "Gazon",
                    description: "",
                    image: null,
                    createdAt: new Date().toISOString(),
                  })
                }
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Adaugă Proiect
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-40 bg-slate-100 relative">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-300">
                        <ImageIcon className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-slate-900 text-sm mt-2">
                      {item.title || "Fără titlu"}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setEditing({ ...item })}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-green-600 cursor-pointer"
                      >
                        <Pencil className="h-3 w-3" />
                        Editează
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Ștergi acest proiect?")) deleteItem(item.id);
                        }}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                        Șterge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images Tab */}
        {tab === "images" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-slate-900">
                Galerie Imagini
              </h2>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Upload className="h-4 w-4" />
                {uploading ? "Se încarcă..." : "Încarcă Imagine"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  for (const file of files) {
                    await uploadImage(file);
                  }
                  e.target.value = "";
                }}
              />
            </div>

            {images.length === 0 ? (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
                <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">
                  Nicio imagine încărcată. Apasă butonul de mai sus.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div
                    key={img.filename}
                    className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden"
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={img.url}
                        alt={img.filename}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => {
                          if (confirm("Ștergi imaginea?")) deleteImage(img.filename);
                        }}
                        className="h-10 w-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-slate-500 truncate">
                        {img.filename}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-heading font-semibold text-slate-900">
                {editing.id.startsWith("new-") ? "Proiect Nou" : "Editează Proiect"}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Image picker */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Imagine
                </label>
                {editing.image ? (
                  <div className="relative h-40 rounded-xl overflow-hidden border border-slate-200">
                    <Image
                      src={editing.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => setEditing({ ...editing, image: null })}
                      className="absolute top-2 right-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.onchange = async (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) setEditing({ ...editing, image: url });
                          }
                        };
                        input.click();
                      }}
                      className="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-green-400 hover:text-green-500 transition-colors duration-200 cursor-pointer"
                    >
                      <Upload className="h-6 w-6 mb-1" />
                      <span className="text-xs">Încarcă imagine nouă</span>
                    </button>
                    {images.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-500 mb-1.5">
                          Sau alege din galerie:
                        </p>
                        <div className="grid grid-cols-4 gap-1.5 max-h-32 overflow-y-auto">
                          {images.map((img) => (
                            <button
                              key={img.filename}
                              onClick={() =>
                                setEditing({ ...editing, image: img.url })
                              }
                              className="aspect-square relative rounded-lg overflow-hidden border-2 border-transparent hover:border-green-500 cursor-pointer"
                            >
                              <Image
                                src={img.url}
                                alt={img.filename}
                                fill
                                className="object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Titlu
                </label>
                <input
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Titlu proiect"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Categorie
                </label>
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Descriere
                </label>
                <textarea
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Descriere proiect..."
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Anulează
              </button>
              <button
                onClick={() => saveItem(editing)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer"
              >
                <Save className="h-4 w-4" />
                Salvează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
