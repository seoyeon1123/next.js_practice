import FormInput from '@/components/form-input';
import React from 'react';
import { useFormState } from 'react-dom';
import SignUp from '../page';

export default function PhoneSignUp() {
  const [state, action] = useFormState(SignUp, null);
  return (
    <div className="flex flex-col gap-2">
      <form action={action}>
        <FormInput
          type="text"
          placeholder="username"
          errors={[]}
          name="username"
          required
        />
        <FormInput
          type="email"
          placeholder="email"
          errors={[]}
          name="email"
          required
        />
        <FormInput
          type="password"
          placeholder="password"
          errors={[]}
          name="password"
          required
        />
        <FormInput
          type="confirmPassword"
          placeholder="confirmPassword"
          errors={[]}
          name="confirmPassword"
          required
        />
      </form>
      <p className="font-light text-xs text-center my-4">
        보안 및 로그인 목적으로 Instagram에서 보내는 SMS 알림을 수신할 수
        있습니다.
      </p>
      <button className="btn">다음</button>
    </div>
  );
}
