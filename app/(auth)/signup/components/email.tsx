import FormInput from '@/components/form-input';
import React from 'react';

export default function EmailSignUp() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full max-w-96">
      <FormInput
        type="email"
        name="email"
        errors={[]}
        required
        placeholder="이메일 주소"
      />

      {/* 수정된 부분 */}
      <div className="flex flex-row gap-1 justify-between w-full">
        <button className="w-32 h-8 bg-slate-200 rounded-xl text-sm">
          @gmail.com
        </button>
        <button className="w-32 h-8 bg-slate-200 rounded-xl text-sm">
          @naver.com
        </button>
        <button className="w-32 h-8 bg-slate-200 rounded-xl text-sm">
          @yahoo.com
        </button>
      </div>
      <button className="btn mt-5">다음</button>
    </div>
  );
}
