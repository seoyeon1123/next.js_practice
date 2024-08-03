import { useFormStatus } from 'react-dom';

export default function LoginBtn() {
  const { pending } = useFormStatus();
  return (
    <>
      <button disabled={pending} className="btn w-full text-sm font-semibold">
        {pending ? '로딩중 ...' : '로그인'}
      </button>
    </>
  );
}
