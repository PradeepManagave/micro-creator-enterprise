'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CreateForm() {
  const searchParams = useSearchParams();
  const defaultClientId = searchParams.get('clientId') || '';
  const defaultLang = searchParams.get('language') || 'Marathi';

  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState('');
  const [generatedScript, setGeneratedScript] = useState<any>(null);

  const handleGenerate = async () => {
    setStep(2);
    try {
      const payload: any = { topic, platforms: 'Instagram', language: defaultLang };
      if (defaultClientId) payload.clientId = defaultClientId;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/scripts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setGeneratedScript(data);
      setStep(3);
    } catch (err) {
      alert('Failed to generate script');
      setStep(1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-2xl text-on-surface">AI Script Wizard 🪄</h1>
        <p className="text-sm text-on-surface-variant mt-1">Generate viral scripts in 5 simple steps.</p>
      </div>

      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex-1 h-2 rounded-full transition-colors" style={{ backgroundColor: s <= step ? '#1a56db' : '#e1e8fd' }} />
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white border border-border-blue rounded-2xl p-8 fade-up">
          <h2 className="font-poppins font-bold text-xl mb-6">What is the topic of your video?</h2>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 3 secret places to visit in Pune this monsoon..."
            className="w-full h-32 p-4 border border-border-blue rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <div className="flex justify-end mt-6">
            <button onClick={handleGenerate} className="bg-primary text-white font-poppins font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-all">
              Next Step →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white border border-border-blue rounded-2xl p-8 fade-up text-center">
          <h2 className="font-poppins font-bold text-xl mb-6">Generating Script...</h2>
          <div className="flex justify-center p-8">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
          <p className="text-on-surface-variant text-sm mt-4">Analyzing trends and writing viral copy...</p>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white border border-border-blue rounded-2xl p-8 fade-up">
           <h2 className="font-poppins font-bold text-xl mb-4">Your Generated Script</h2>
           <div className="p-4 bg-surface-container-low rounded-xl text-sm leading-relaxed mb-6 whitespace-pre-wrap">
             {generatedScript?.content}
           </div>
           
           <h3 className="font-poppins font-bold text-md mb-2">Caption</h3>
           <div className="p-4 bg-surface-container-low rounded-xl text-sm leading-relaxed mb-6">
             {generatedScript?.caption}
           </div>

           <h3 className="font-poppins font-bold text-md mb-2">Hashtags</h3>
           <div className="p-4 bg-surface-container-low rounded-xl text-sm leading-relaxed mb-6 text-primary">
             {generatedScript?.hashtags}
           </div>
           <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="text-on-surface-variant font-bold px-6 py-3 hover:bg-surface-container-low rounded-full transition-all">
              ← Back
            </button>
            <button onClick={() => alert('Saved!')} className="bg-success-tint text-tertiary font-poppins font-bold px-8 py-3 rounded-full hover:bg-success-tint/80 transition-all">
              Save & Export ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateForm />
    </Suspense>
  );
}
