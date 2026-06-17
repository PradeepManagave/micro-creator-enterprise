"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddClientModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    niche: '',
    platforms: 'Instagram',
    defaultLanguage: 'Marathi',
    defaultTone: 'Engaging'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsOpen(false);
        router.refresh(); // Refresh the server component to load new client
      }
    } catch (err) {
      alert('Failed to add client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-primary text-white font-bold px-6 py-2 rounded-full hover:bg-primary/90 transition-all">
        Add Client +
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md fade-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-poppins font-bold text-xl">Add New Client</h2>
              <button onClick={() => setIsOpen(false)} className="text-on-surface-variant font-bold">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Client Name</label>
                <input required type="text" className="w-full border border-border-blue rounded-lg p-2 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Pune Real Estate Co." />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Niche</label>
                <input required type="text" className="w-full border border-border-blue rounded-lg p-2 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value})} placeholder="e.g. Real Estate" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Default Language</label>
                  <select className="w-full border border-border-blue rounded-lg p-2 outline-none" value={formData.defaultLanguage} onChange={e => setFormData({...formData, defaultLanguage: e.target.value})}>
                    <option>Marathi</option>
                    <option>Hindi</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Tone</label>
                  <select className="w-full border border-border-blue rounded-lg p-2 outline-none" value={formData.defaultTone} onChange={e => setFormData({...formData, defaultTone: e.target.value})}>
                    <option>Engaging</option>
                    <option>Professional</option>
                    <option>Humorous</option>
                  </select>
                </div>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4 hover:bg-primary/90 transition-all disabled:opacity-50">
                {loading ? 'Adding...' : 'Save Client'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
