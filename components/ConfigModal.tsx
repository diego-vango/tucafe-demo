'use client';

import React, { useState } from 'react';
import { X, Database, RefreshCw, CheckCircle, AlertCircle, FileSpreadsheet, ExternalLink } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCsvUrl: string;
  onSaveCsvUrl: (url: string) => void;
  onResetToDefault: () => void;
}

export default function ConfigModal({
  isOpen,
  onClose,
  currentCsvUrl,
  onSaveCsvUrl,
  onResetToDefault,
}: ConfigModalProps) {
  const [url, setUrl] = useState(currentCsvUrl);
  const [isTesting, setIsTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);
    setStatusMessage(null);

    try {
      if (!url.trim()) {
        onResetToDefault();
        setStatusMessage({ type: 'success', text: 'Se ha restaurado el catálogo por defecto de la tostaduría.' });
        setIsTesting(false);
        return;
      }

      const res = await fetch(url.trim(), { cache: 'no-store' });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const text = await res.text();
      
      if (!text || text.length < 10) {
        throw new Error('El archivo CSV parece estar vacío o inaccesible.');
      }

      onSaveCsvUrl(url.trim());
      setStatusMessage({ type: 'success', text: '¡Conexión con Google Sheets exitosa! El catálogo se ha actualizado.' });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error al leer CSV: ${err.message || 'Asegúrate de que la hoja esté publicada como CSV público.'}`
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200">
        
        <div className="bg-[#2C1A1D] text-[#FAF8F5] p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#D4A373]" />
            <h3 className="font-extrabold text-base">Integración con Google Sheets (CSV)</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-gray-600 leading-relaxed">
            Puedes conectar este catálogo e-commerce directamente a una planilla pública de Google Sheets en formato CSV para actualizar precios, productos, notas y stocks en tiempo real.
          </p>

          <form onSubmit={handleTestAndSave} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                URL del CSV Público de Google Sheets:
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
                className="w-full p-2.5 bg-stone-50 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#D4A373] focus:outline-hidden"
              />
            </div>

            {statusMessage && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                disabled={isTesting}
                className="flex-1 py-2.5 bg-[#2C1A1D] hover:bg-[#3d2529] text-[#D4A373] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                <span>Guardar & Sincronizar Sheet</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUrl('');
                  onResetToDefault();
                  setStatusMessage({ type: 'success', text: 'Catálogo restaurado al inventario local.' });
                }}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl"
              >
                Restaurar
              </button>
            </div>
          </form>

          {/* Instructions Box */}
          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-[11px] text-amber-900 space-y-1.5">
            <strong className="font-bold flex items-center gap-1 text-amber-950">
              <ExternalLink className="w-3.5 h-3.5" />
              ¿Cómo publicar tu hoja en Google Sheets?
            </strong>
            <ol className="list-decimal list-inside space-y-1 text-amber-800">
              <li>Abre tu planilla en Google Sheets con columnas: <code className="font-mono bg-amber-100 px-1">nombre</code>, <code className="font-mono bg-amber-100 px-1">precio</code>, <code className="font-mono bg-amber-100 px-1">origen</code>, <code className="font-mono bg-amber-100 px-1">notas</code>, <code className="font-mono bg-amber-100 px-1">categoria</code>.</li>
              <li>Ve a <strong>Archivo &gt; Compartir &gt; Publicar en la Web</strong>.</li>
              <li>Selecciona la hoja y elige el formato <strong>Valores separados por comas (.csv)</strong>.</li>
              <li>Copia el enlace generado y pégalo arriba.</li>
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
}
