'use client';

import FormInput from '@/components/form-input';
import { useFormState } from 'react-dom';
import { smsLogin } from './action';
import LoginBtn from '@/components/login-btn';

const initialState = {
  token: false,
  error: undefined,
};

export default function Login() {
  const [state, action] = useFormState(smsLogin, initialState);
  //state의 초기값 initalState로 정해줌
  return (
    <>
      <div className="flex flex-col gap-3 py-8 px-6 text-center mt-8">
        <h1 className="text-4xl font-bold">SMS Login </h1>
        <h2 className="text-ml">Verify your phone number</h2>
        <form className="flex flex-col gap-3" action={action}>
          {state.token ? (
            <FormInput
              name="token"
              type="number"
              placeholder="token"
              required
              min={100000}
              max={999999}
              errors={state.error?.formErrors || []}
            />
          ) : (
            <FormInput
              name="phone"
              type="text"
              placeholder="phone number"
              required
              errors={state.error?.formErrors || []}
            />
          )}
          <button className="btn">
            {state.token ? '인증번호를 입력하세요' : '전화번호를 입력하세요'}
          </button>
        </form>
      </div>
    </>
  );
}
