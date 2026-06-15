'use client'

import { useEffect, useState } from 'react'
import { Plus, X, Search } from 'lucide-react'
import BinaryStar from '@/components/BinaryStar'
import { supabase, DictionaryEntry } from '@/lib/supabase'

export default function DictionaryPage() {
  const [entries, setEntries] = useState<DictionaryEntry[]>([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ word: '', definition: '', example: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project-id.supabase.co'

  useEffect(() => {
    if (isConfigured) fetchEntries()
    else setLoading(false)
  }, [isConfigured])

  async function fetchEntries() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('dictionary')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setEntries(data || [])
    } catch (e: unknown) {
      console.error(e)
      setError('could not load the lexicon — check your Supabase setup')
    } finally {
      setLoading(false)
    }
  }

  async function addEntry() {
    if (!form.word.trim() || !form.definition.trim()) return
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from('dictionary')
        .insert({
          word: form.word.trim(),
          definition: form.definition.trim(),
          example: form.example.trim() || null,
        })
        .select()
        .single()
      if (error) throw error
      setEntries(prev => [data, ...prev])
      setForm({ word: '', definition: '', example: '' })
      setShowForm(false)
    } catch (e: unknown) {
      console.error(e)
      setError('could not save that entry — try again')
    } finally {
      setSaving(false)
    }
  }

  async function removeEntry(id: string) {
    try {
      const { error } = await supabase.from('dictionary').delete().eq('id', id)
      if (error) throw error
      setEntries(prev => prev.filter(e => e.id !== id))
    } catch (e: unknown) {
      console.error(e)
      setError('could not remove that entry — try again')
    }
  }

  const filtered = entries.filter(
    e =>
      e.word.toLowerCase().includes(search.toLowerCase()) ||
      e.definition.toLowerCase().includes(search.toLowerCase())
  )

  if (!isConfigured) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="surface rounded-2xl p-8 sm:p-10 text-center max-w-md">
          <div className="mb-4 flex justify-center"><BinaryStar size={48} /></div>
          <p className="tag mb-2 text-ember-dim">setup required</p>
          <h2 className="font-display text-2xl mb-3">the lexicon has no shelf yet</h2>
          <p className="font-body text-sm mb-6 leading-relaxed text-ink/70">
            Connect a Supabase project and add your keys to <code className="bg-parchment-dim px-1.5 py-0.5 rounded text-xs font-mono">.env.local</code>, then create the <code className="bg-parchment-dim px-1.5 py-0.5 rounded text-xs font-mono">dictionary</code> table.
          </p>
          <div className="bg-midnight rounded-xl p-4 text-left text-xs font-mono text-mist border border-midnight-3 overflow-x-auto whitespace-nowrap">
            <div>NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...</div>
          </div>
          <p className="mt-4 text-xs text-ink/50 font-mono uppercase tracking-wider">
            see SUPABASE_SETUP.md for the table SQL
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="text-center mb-8 animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <p className="tag mb-3">03 — shared vocabulary</p>
        <h1 className="font-display text-4xl sm:text-5xl font-medium">
          the <span className="glow-text">lexicon</span>
        </h1>
        <p className="font-body text-muted text-sm mt-3 max-w-sm mx-auto leading-relaxed">
          words, moments, and things only we understand — catalogued for whenever we need them.
        </p>
      </div>

      {/* Search + add */}
      <div className="flex gap-2 mb-8">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="search the lexicon..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-md border border-midnight-3 surface-dark font-mono text-sm text-mist placeholder-muted transition-all"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-midnight-2 text-ember border border-ember/30 text-xs font-mono uppercase tracking-widest hover:border-ember hover:bg-midnight-3 transition-all active:scale-95"
        >
          <Plus size={14} /> add
        </button>
      </div>

      {error && (
        <div className="text-center text-quartz mb-6 surface-dark rounded-xl p-3 font-mono text-xs uppercase tracking-wider">
          {error}
        </div>
      )}

      {/* Add form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/80 backdrop-blur-sm p-4">
          <div className="surface rounded-2xl p-6 sm:p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl">new entry</h2>
              <button onClick={() => setShowForm(false)} className="text-ink/40 hover:text-ink">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-ink/50 mb-1.5 uppercase tracking-wider">word or phrase</label>
                <input
                  type="text"
                  placeholder="e.g. our silence, good morning texts..."
                  value={form.word}
                  onChange={e => setForm(f => ({ ...f, word: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-md border border-parchment-dim bg-white font-body text-sm text-ink placeholder-ink/30"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-ink/50 mb-1.5 uppercase tracking-wider">definition</label>
                <textarea
                  placeholder="what does it mean to us?"
                  value={form.definition}
                  onChange={e => setForm(f => ({ ...f, definition: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-md border border-parchment-dim bg-white font-body text-sm text-ink placeholder-ink/30 resize-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-ink/50 mb-1.5 uppercase tracking-wider">example (optional)</label>
                <input
                  type="text"
                  placeholder="a little memory..."
                  value={form.example}
                  onChange={e => setForm(f => ({ ...f, example: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-md border border-parchment-dim bg-white font-body text-sm text-ink placeholder-ink/30"
                />
              </div>

              <button
                onClick={addEntry}
                disabled={!form.word.trim() || !form.definition.trim() || saving}
                className="w-full py-3 rounded-md bg-ink text-parchment font-mono text-xs uppercase tracking-widest hover:bg-ink/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              >
                {saving ? 'filing...' : 'file this entry'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entries */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl p-5 sm:p-6 surface-dark animate-pulse h-24" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-3 flex justify-center opacity-40"><BinaryStar size={40} /></div>
          <p className="font-display text-lg">
            {search ? 'no entries found' : 'the lexicon is empty — file the first word'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((entry, i) => (
            <div
              key={entry.id}
              className="surface rounded-xl p-5 sm:p-6 card-hover relative group animate-fade-up"
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => removeEntry(entry.id)}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-ink/30 hover:text-quartz transition-all"
              >
                <X size={15} />
              </button>

              <div className="flex items-start gap-4">
                <span className="font-mono text-xs text-ember-dim mt-1.5 shrink-0 tabular-nums">
                  {String(filtered.length - i).padStart(3, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg sm:text-xl font-medium leading-snug mb-1.5">
                    {entry.word}
                  </h3>
                  <p className="font-body text-ink/80 text-sm sm:text-base leading-relaxed">
                    {entry.definition}
                  </p>
                  {entry.example && (
                    <p className="font-display italic text-ink/50 text-sm mt-2">
                      &ldquo;{entry.example}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
