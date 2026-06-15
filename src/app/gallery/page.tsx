'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Heart, Camera } from 'lucide-react'
import { supabase } from '@/lib/supabase'

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
      setError('Could not load photos. Make sure Supabase is configured!')
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
      setError('Upload failed 😢')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleDelete(name: string) {
    if (!confirm('Remove this memory? 🥺')) return
    await supabase.storage.from(BUCKET).remove([name])
    setPhotos(prev => prev.filter(p => p.name !== name))
    setSelected(null)
  }

  if (!isConfigured) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="glass rounded-3xl p-8 sm:p-12 text-center max-w-md border border-blush-200 shadow-xl">
          <div className="text-5xl mb-4">📸</div>
          <h2 className="font-display text-2xl text-blush-600 mb-3">Almost there!</h2>
          <p className="font-body text-blush-500 text-sm mb-6 leading-relaxed">
            To enable the gallery, create a <strong>Supabase</strong> project and add your keys to <code className="bg-blush-100 px-1.5 py-0.5 rounded text-xs">.env.local</code>
          </p>
          <div className="bg-blush-50 rounded-xl p-4 text-left text-xs font-mono text-blush-600 border border-blush-200">
            <div>NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...</div>
          </div>
          <p className="mt-4 text-xs text-blush-400">
            Then create a storage bucket named <strong>gallery</strong> and set it to public 💕
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <p className="font-body text-blush-400 text-xs tracking-widest uppercase mb-2">our</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold shimmer-text">memories 🌸</h1>
      </div>

      {/* Upload button */}
      <div className="flex justify-center mb-10">
        <label className="cursor-pointer">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <div className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-body font-medium text-sm transition-all
            ${uploading
              ? 'bg-blush-200 text-blush-400 cursor-wait'
              : 'bg-blush-400 text-white hover:bg-blush-500 shadow-lg shadow-blush-200 hover:shadow-blush-300 active:scale-95'
            }
          `}>
            {uploading ? (
              <><span className="animate-spin">🌸</span> uploading...</>
            ) : (
              <><Upload size={16} /> add a memory</>
            )}
          </div>
        </label>
      </div>

      {error && (
        <div className="text-center text-blush-500 mb-6 glass rounded-xl p-3 border border-blush-200">
          {error}
        </div>
      )}

      {/* Photo grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-blush-100 animate-pulse" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-24">
          <Camera size={48} className="mx-auto text-blush-200 mb-4" />
          <p className="font-display text-xl text-blush-400">no memories yet 🥺</p>
          <p className="font-body text-blush-300 text-sm mt-1">be the first to add one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div
              key={photo.name}
              className="photo-card relative aspect-square rounded-2xl overflow-hidden cursor-pointer card-hover shadow-md shadow-blush-100"
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
              <div className="photo-overlay absolute inset-0 bg-gradient-to-t from-blush-600/60 to-transparent opacity-0 transition-opacity duration-300 flex items-end p-3">
                <Heart size={18} className="text-white fill-white" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-square sm:aspect-video">
              <Image src={selected.url} alt="memory" fill className="object-contain bg-blush-50" />
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => handleDelete(selected.name)}
                className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-blush-400 hover:text-blush-600 transition-colors"
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
