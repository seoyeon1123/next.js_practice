import FormInput from '@/components/form-input';
import React from 'react';

export default function PhoneSignUp() {
  return (
    <div>
      <FormInput
        type="number"
        placeholder="전화번호"
        errors={[]}
        name="phoneNumber"
        required
      />
      <p className="font-light text-xs text-center my-4">
        보안 및 로그인 목적으로 Instagram에서 보내는 SMS 알림을 수신할 수
        있습니다.
      </p>
      <button className="btn">다음</button>
    </div>
  );
}
