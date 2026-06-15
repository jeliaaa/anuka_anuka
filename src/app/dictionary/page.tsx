'use client'

import { useState } from 'react'
import { Plus, X, Heart, Search, BookOpen } from 'lucide-react'

type Entry = {
  id: string
  word: string
  definition: string
  example?: string
  emoji: string
  color: string
}

const CARD_COLORS = [
  'from-pink-50 to-rose-100',
  'from-blush-50 to-blush-100',
  'from-fuchsia-50 to-pink-100',
  'from-rose-50 to-pink-100',
  'from-pink-100 to-blush-100',
]

const EMOJI_OPTIONS = ['💕', '🌸', '✨', '💖', '🌷', '🥰', '💌', '🍀', '🌙', '⭐', '🫶', '💝', '🌺', '🎀', '🩷']

// Starter entries — you can edit or delete these!
const STARTER_ENTRIES: Entry[] = [
  {
    id: '1',
    word: 'our silence',
    definition: 'the kind of quiet that doesn\'t need to be filled — just being near you is enough.',
    example: 'we sat together doing nothing and it was everything.',
    emoji: '🌙',
    color: CARD_COLORS[0],
  },
  {
    id: '2',
    word: 'good morning, love',
    definition: 'the first thing that makes any day worth waking up for.',
    example: 'three words that reset the whole world.',
    emoji: '☀️',
    color: CARD_COLORS[1],
  },
  {
    id: '3',
    word: 'our song',
    definition: 'any song that starts playing and immediately becomes about us.',
    example: 'i can\'t listen to it without smiling.',
    emoji: '🎵',
    color: CARD_COLORS[2],
  },
]

export default function DictionaryPage() {
  const [entries, setEntries] = useState<Entry[]>(STARTER_ENTRIES)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ word: '', definition: '', example: '', emoji: '💕' })

  const filtered = entries.filter(
    e =>
      e.word.toLowerCase().includes(search.toLowerCase()) ||
      e.definition.toLowerCase().includes(search.toLowerCase())
  )

  function addEntry() {
    if (!form.word.trim() || !form.definition.trim()) return
    const newEntry: Entry = {
      id: Date.now().toString(),
      word: form.word.trim(),
      definition: form.definition.trim(),
      example: form.example.trim() || undefined,
      emoji: form.emoji,
      color: CARD_COLORS[entries.length % CARD_COLORS.length],
    }
    setEntries(prev => [newEntry, ...prev])
    setForm({ word: '', definition: '', example: '', emoji: '💕' })
    setShowForm(false)
  }

  function removeEntry(id: string) {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="text-center mb-8 animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <p className="font-body text-blush-400 text-xs tracking-widest uppercase mb-2">our</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold shimmer-text">little dictionary 💌</h1>
        <p className="font-body text-blush-400 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
          words, moments, and things only we understand — a reminder of us, whenever you need it 🌸
        </p>
      </div>

      {/* Search + add */}
      <div className="flex gap-2 mb-8">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blush-300" />
          <input
            type="text"
            placeholder="search our words..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-blush-200 bg-white/80 font-body text-sm text-blush-700 placeholder-blush-300 transition-all"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-blush-400 text-white text-sm font-body font-medium hover:bg-blush-500 transition-all shadow-lg shadow-blush-200 active:scale-95"
        >
          <Plus size={16} /> add
        </button>
      </div>

      {/* Add form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="glass rounded-3xl p-6 sm:p-8 w-full max-w-md border border-blush-200 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-blush-600">add a new word 💕</h2>
              <button onClick={() => setShowForm(false)} className="text-blush-300 hover:text-blush-500">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Emoji picker */}
              <div>
                <label className="block font-body text-xs text-blush-400 mb-2 uppercase tracking-wider">pick an emoji</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_OPTIONS.map(em => (
                    <button
                      key={em}
                      onClick={() => setForm(f => ({ ...f, emoji: em }))}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all ${
                        form.emoji === em ? 'bg-blush-400 shadow-md scale-110' : 'bg-white hover:bg-blush-50 border border-blush-100'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-body text-xs text-blush-400 mb-1.5 uppercase tracking-wider">word or phrase</label>
                <input
                  type="text"
                  placeholder="e.g. our silence, good morning texts..."
                  value={form.word}
                  onChange={e => setForm(f => ({ ...f, word: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-blush-200 bg-white font-body text-sm text-blush-700 placeholder-blush-300"
                />
              </div>

              <div>
                <label className="block font-body text-xs text-blush-400 mb-1.5 uppercase tracking-wider">definition</label>
                <textarea
                  placeholder="what does it mean to us?"
                  value={form.definition}
                  onChange={e => setForm(f => ({ ...f, definition: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-blush-200 bg-white font-body text-sm text-blush-700 placeholder-blush-300 resize-none"
                />
              </div>

              <div>
                <label className="block font-body text-xs text-blush-400 mb-1.5 uppercase tracking-wider">example (optional)</label>
                <input
                  type="text"
                  placeholder="a little memory..."
                  value={form.example}
                  onChange={e => setForm(f => ({ ...f, example: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-blush-200 bg-white font-body text-sm text-blush-700 placeholder-blush-300"
                />
              </div>

              <button
                onClick={addEntry}
                disabled={!form.word.trim() || !form.definition.trim()}
                className="w-full py-3 rounded-full bg-blush-400 text-white font-body font-medium text-sm hover:bg-blush-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blush-200 active:scale-95"
              >
                add to our dictionary 🌸
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen size={40} className="mx-auto text-blush-200 mb-3" />
          <p className="font-display text-lg text-blush-400">
            {search ? 'no words found 🥺' : 'your dictionary is empty — add the first word! 💕'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((entry, i) => (
            <div
              key={entry.id}
              className={`dict-card rounded-2xl p-5 sm:p-6 card-hover relative group animate-fade-up`}
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => removeEntry(entry.id)}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-blush-300 hover:text-blush-500 transition-all"
              >
                <X size={15} />
              </button>

              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5 shrink-0">{entry.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg sm:text-xl text-blush-600 font-semibold leading-snug mb-1.5">
                    {entry.word}
                  </h3>
                  <p className="font-body text-blush-700 text-sm sm:text-base leading-relaxed">
                    {entry.definition}
                  </p>
                  {entry.example && (
                    <p className="font-display italic text-blush-400 text-sm mt-2">
                      &ldquo;{entry.example}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Little heart decoration */}
              <div className="absolute bottom-3 right-4 opacity-20">
                <Heart size={18} className="fill-blush-400 text-blush-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
