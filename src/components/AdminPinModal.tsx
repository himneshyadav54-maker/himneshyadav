import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { verifyAdminPin } from '../utils/helpers';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setErrorMessage('');
      setIsSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pin)) {
      setIsSuccess(true);
      setError(false);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 500);
    } else {
      setError(true);
      setErrorMessage('Access Denied. Invalid Security PIN.');
      setPin('');
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-pin-title"
    >
      <div
        className="relative w-full max-w-sm bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF6B2C]/20 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close PIN modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-[#FF8C42] mb-4 shadow-inner">
          {isSuccess ? (
            <CheckCircle2 className="w-7 h-7 text-green-400 animate-in zoom-in-50 duration-200" />
          ) : (
            <Lock className="w-6 h-6 text-[#FF6B2C]" />
          )}
        </div>

        <h3 id="admin-pin-title" className="font-heading text-lg sm:text-xl font-bold text-white mb-1">
          Admin Authentication
        </h3>

        <p className="text-xs text-zinc-400 mb-6">
          Enter 6-digit security PIN to access the Admin Control Panel
        </p>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError(false);
              }}
              placeholder="••••••"
              className="w-full text-center tracking-[0.4em] font-mono text-xl py-3 px-4 rounded-xl bg-black border border-white/15 focus:border-[#FF6B2C] text-white focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="text-xs text-red-400 flex items-center justify-center gap-1.5 font-medium animate-in fade-in duration-150">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess && (
            <div className="text-xs text-green-400 flex items-center justify-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PIN Verified. Unlocking Admin Panel...</span>
            </div>
          )}

          <button
            type="submit"
            disabled={pin.length === 0}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(255,107,44,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Verify Security PIN</span>
          </button>
        </form>

        <div className="mt-5 text-[10px] font-mono text-zinc-400">
          AUTHORIZED ACCESS ONLY
        </div>
      </div>
    </div>
  );
};
