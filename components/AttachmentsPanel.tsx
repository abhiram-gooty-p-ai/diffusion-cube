'use client';

import { useRef, useState } from 'react';
import { PendingAttachment, StoredAttachment } from '@/components/ChatPanel';

interface Props {
  attachments: PendingAttachment[];
  uploadedFiles?: StoredAttachment[];
  uploadedFileNames?: string[];
  onAttachFiles: (files: File[]) => void;
  onRemoveAttachment: (id: string) => void;
  resourceOnly?: boolean;
  onAddResourceLink?: (title: string, url: string) => Promise<void>;
}

export default function AttachmentsPanel({ attachments, uploadedFiles = [], uploadedFileNames = [], onAttachFiles, onRemoveAttachment, resourceOnly = false, onAddResourceLink }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [linkError, setLinkError] = useState<string | null>(null);
  const [savingLink, setSavingLink] = useState(false);

  async function addLink() {
    if (!onAddResourceLink || !resourceTitle.trim() || !resourceUrl.trim()) return;
    setSavingLink(true); setLinkError(null);
    try { await onAddResourceLink(resourceTitle, resourceUrl); setResourceTitle(''); setResourceUrl(''); }
    catch (error) { setLinkError(error instanceof Error ? error.message : 'Could not add this link.'); }
    finally { setSavingLink(false); }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length) onAttachFiles(files);
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current++;
    if (e.dataTransfer.types.includes('Files')) setIsDragging(true);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files ?? []);
    if (files.length) onAttachFiles(files);
  }

  return (
    <div className="flex flex-col h-full">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft mb-3">Files</p>

      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`rounded-lg border-2 border-dashed p-4 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-coral bg-coral-soft' : 'border-navy/15 hover:border-navy/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.xlsx,.xls,.pptx,.txt,.md,.png,.jpg,.jpeg,.gif,.webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-xs text-ink-soft">📎 {resourceOnly ? 'Add open-source resource files only' : 'Attach files, or drag and drop'}</p>
      </div>

      {resourceOnly && <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">These files will be stored as reusable pathway resources when you send them. Do not attach private or restricted material.</p>}

      {resourceOnly && onAddResourceLink && (
        <div className="mt-4 border-t border-navy/10 pt-3">
          <p className="text-xs font-medium text-navy">Add an open-source link</p>
          <input value={resourceTitle} onChange={(e) => setResourceTitle(e.target.value)} placeholder="Resource title" className="mt-2 w-full rounded-lg border border-navy/15 bg-white px-2.5 py-2 text-xs outline-none focus:border-navy" />
          <input value={resourceUrl} onChange={(e) => setResourceUrl(e.target.value)} placeholder="https://…" type="url" className="mt-2 w-full rounded-lg border border-navy/15 bg-white px-2.5 py-2 text-xs outline-none focus:border-navy" />
          {linkError && <p className="mt-1 text-[11px] text-coral">{linkError}</p>}
          <button type="button" onClick={addLink} disabled={savingLink || !resourceTitle.trim() || !resourceUrl.trim()} className="mt-2 rounded-lg border border-navy/15 px-2.5 py-1.5 text-xs text-ink-soft hover:border-coral hover:text-coral disabled:opacity-40">{savingLink ? 'Adding…' : 'Add link'}</button>
        </div>
      )}

      {attachments.length > 0 && (
        <div className="flex flex-col gap-1 mt-3">
          {attachments.map((a) => (
            <div
              key={a.id}
              className={`flex items-center justify-between gap-2 text-xs rounded-lg px-2.5 py-1.5 border ${
                a.state === 'error'
                  ? 'border-coral/40 text-coral bg-coral-soft'
                  : 'border-navy/15 text-ink-soft bg-white'
              }`}
            >
              <span className="truncate">
                {a.state === 'reading' || a.state === 'uploading' ? '⏳' : a.state === 'error' ? '⚠️' : '📎'} {a.name}
                {a.state === 'error' && a.error ? ` — ${a.error}` : ''}
              </span>
              <button
                type="button"
                onClick={() => onRemoveAttachment(a.id)}
                disabled={a.state === 'reading' || a.state === 'uploading'}
                className="flex-shrink-0 text-ink-soft hover:text-navy disabled:opacity-30"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {(uploadedFiles.length > 0 || uploadedFileNames.length > 0) && (
        <div className="flex flex-col gap-1 mt-3 overflow-y-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft/70">Shared in this chat</p>
          {uploadedFiles.map((file) => (
            <a
              key={file.id}
              href={`/api/adoption-files/${file.id}/open`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs rounded-lg px-2.5 py-1.5 border border-navy/10 text-ink-soft bg-paper-dim transition hover:border-coral/30 hover:text-coral"
            >
              <span aria-hidden>↗</span>
              <span className="truncate">{file.name}</span>
            </a>
          ))}
          {uploadedFileNames.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-2 text-xs rounded-lg px-2.5 py-1.5 border border-navy/10 text-ink-soft bg-paper-dim"
            >
              <span className="truncate">✓ {name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
