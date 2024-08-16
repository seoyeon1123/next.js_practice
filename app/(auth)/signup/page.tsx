'use client';

import { useState } from 'react';
import PhoneSignUp from './components/phone';
import EmailSignUp from './components/email';
import { useFormState } from 'react-dom';

export default function SignUp() {
  const [view, setView] = useState('');
  const [state, action] = useFormState(SignUp, null);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 text-center mb-2">
        <h3 className="font-semibold mb-2">등록</h3>
        <div className="w-screen h-px bg-slate-200" />
      </div>
      <div className="w-full flex flex-row justify-around mb-6">
        <button
          onClick={() => setView('phone')}
          className="focus:border-b-2 border-black transition-colors w-1/2"
        >
          휴대폰
        </button>

        <button
          onClick={() => setView('email')}
          className="focus:border-b-2 border-black transition-colors w-1/2"
        >
          이메일
        </button>
      </div>
      <div>
        {view === 'phone' && (
          <div>
            <PhoneSignUp />
          </div>
        )}
        {view === 'email' && (
          <div>
            <EmailSignUp />
          </div>
        )}
      </div>
    </div>
  );
}
