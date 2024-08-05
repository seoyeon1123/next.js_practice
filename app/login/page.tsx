'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import FormInput from '@/components/form-input';
import { useState } from 'react';
import { handleForm } from './action';
import LoginBtn from '@/components/login-btn';
import { useFormState } from 'react-dom';
import { error } from 'console';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, action] = useFormState(handleForm, null);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-between items-center text-center my-12 mx-auto ">
      <h1 className="text-4xl">Instagram</h1>
      <div className="flex flex-col mt-10 gap-4 items-center w-full">
        <Link
          href="/facebook/login"
          className="flex flex-row justify-center items-center btn w-full text-sm gap-2"
        >
          <span>
            <FontAwesomeIcon icon={faFacebook} className="size-5" />
          </span>
          Facebook으로 계속하기
        </Link>
        <div className="flex flex-row items-center w-full my-4">
          <span className="h-px w-full bg-slate-200"></span>
          <div className="mx-2 text-xs text-slate-500 whitespace-nowrap">
            {/* whitespace-nowrap: 텍스트가 줄 바꿈 없이 한 줄로 유지 */}
            또는
          </div>
          <span className="h-px w-full bg-slate-200"></span>
        </div>

        <form action={action} className="flex flex-col gap-2 w-full">
          <FormInput
            name="email"
            required
            type="email"
            placeholder="사용자 이메일"
            errors={state?.errors?.fieldErrors.email || []}
          />
          <FormInput
            name="password"
            required
            type="password"
            placeholder="비밀번호"
            errors={state?.errors?.fieldErrors.password || []}
            showPassword={showPassword}
            onTogglePassword={togglePasswordVisibility}
          />
          <FormInput
            name="comfirmPassword"
            required
            type="password"
            placeholder="비밀번호 재입력하세요"
            errors={state?.errors?.fieldErrors.comfirmPassword || []}
            showPassword={showPassword}
            onTogglePassword={togglePasswordVisibility}
          />

          <Link href="/password" className="text-sm py-1 text-right w-full">
            비밀번호를 잊으셨나요?
          </Link>
          <LoginBtn />
        </form>
      </div>
      <div className="flex gap-1 mt-8 *:font-normal text-sm">
        <span className="text-slate-500">계정이 없으신가요?</span>
        <span>
          <Link href="/signup">가입하기</Link>
        </span>
      </div>
    </div>
  );
}
