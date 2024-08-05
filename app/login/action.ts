'use server';
import { z } from 'zod';

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(5, '비밀번호가 너무 짧아')
      .max(10, '비밀번호가 너무 길어'),
    comfirmPassword: z
      .string()
      .min(5, '비밀번호가 너무 짧아')
      .max(10, '비밀번호가 너무 길어'),
  })
  .refine(({ password, comfirmPassword }) => password === comfirmPassword, {
    message: '비밀번호 불일치',
    path: ['comfirmPassword'],
  });

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    comfirmPassword: formData.get('comfirmPassword'),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  } else {
    return {
      success: true,
      data: result.data,
    };
  }
}
