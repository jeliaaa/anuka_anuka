'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import BinaryStar from '@/components/BinaryStar'

type Photo = {
  name: string
  url: string
  caption?: string
}

const BUCKET = 'gallery'

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [selected, setSelected] = useState<Photo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project-id.supabase.co'

  useEffect(() => {
    if (isConfigured) fetchPhotos()
    else setLoading(false)
  }, [isConfigured])

  async function fetchPhotos() {
    setLoading(true)
    try {
      const { data, error } = await supabase.storage.from(BUCKET).list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      if (error) throw error

      const files = (data || []).filter(f => f.name !== '.emptyFolderPlaceholder')
      const withUrls = files.map(f => {
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(f.name)
        return { name: f.name, url: urlData.publicUrl }
      })
      setPhotos(withUrls)
    } catch (e: unknown) {
      console.error(e)
      setError('could not load the archive — check your Supabase setup')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

      if (uploadError) throw uploadError
      await fetchPhotos()
      setCaption('')
    } catch (e: unknown) {
      console.error(e)
      setError('upload failed — try again')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleDelete(name: string) {
    if (!confirm('Remove this from the archive?')) return
    await supabase.storage.from(BUCKET).remove([name])
    setPhotos(prev => prev.filter(p => p.name !== name))
    setSelected(null)
  }

  if (!isConfigured) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="surface rounded-2xl p-8 sm:p-10 text-center max-w-md">
          <div className="mb-4 flex justify-center"><BinaryStar size={48} /></div>
          <p className="tag mb-2 text-ember-dim">setup required</p>
          <h2 className="font-display text-2xl mb-3">the archive&rsquo;s drawer is empty</h2>
          <p className="font-body text-sm mb-6 leading-relaxed text-ink/70">
            Connect a Supabase project and add your keys to <code className="bg-parchment-dim px-1.5 py-0.5 rounded text-xs font-mono">.env.local</code> to start filing photos.
          </p>
          <div className="bg-midnight rounded-xl p-4 text-left text-xs font-mono text-mist border border-midnight-3 overflow-x-auto whitespace-nowrap">
            <div>NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...</div>
          </div>
          <p className="mt-4 text-xs text-ink/50 font-mono uppercase tracking-wider">
            then create a public storage bucket named &ldquo;gallery&rdquo;
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <p className="tag mb-3">02 — visual record</p>
        <h1 className="font-display text-4xl sm:text-5xl font-medium">
          memories, <span className="glow-text">catalogued</span>
        </h1>
      </div>

      {/* Upload */}
      <div className="flex justify-center mb-10">
        <label className="cursor-pointer">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <div className={`
            flex items-center gap-2 px-6 py-3 rounded-md font-mono text-xs uppercase tracking-widest transition-all border
            ${uploading
              ? 'bg-midnight-2 text-muted border-midnight-3 cursor-wait'
              : 'bg-midnight-2 text-ember border-ember/30 hover:border-ember hover:bg-midnight-3 active:scale-95'
            }
          `}>
            {uploading ? (
              <>uploading...</>
            ) : (
              <><Upload size={14} /> file a new plate</>
            )}
          </div>
        </label>
      </div>

      {error && (
        <div className="text-center text-quartz mb-6 surface-dark rounded-xl p-3 font-mono text-xs uppercase tracking-wider">
          {error}
        </div>
      )}

      {/* Photo grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg surface-dark animate-pulse" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-24">
          <div className="mb-4 flex justify-center opacity-40"><BinaryStar size={48} /></div>
          <p className="font-display text-xl">no plates filed yet</p>
          <p className="font-mono text-xs uppercase tracking-widest text-muted mt-2">be the first to add one</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div
              key={photo.name}
              className="photo-card group relative aspect-square rounded-lg overflow-hidden cursor-pointer card-hover border border-midnight-3"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => setSelected(photo)}
            >
              <Image
                src={photo.url}
                alt="memory"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              <div className="photo-overlay absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 flex items-end p-2">
                <span className="font-mono text-[0.65rem] text-ember tracking-widest">no.{String(photos.length - i).padStart(3, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/90 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-midnight-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-square sm:aspect-video">
              <Image src={selected.url} alt="memory" fill className="object-contain bg-midnight-2" />
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => handleDelete(selected.name)}
                className="w-9 h-9 rounded-full bg-midnight/80 backdrop-blur flex items-center justify-center text-mist hover:text-quartz transition-colors border border-midnight-3"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
