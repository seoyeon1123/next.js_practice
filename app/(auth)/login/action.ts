'use server';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

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

  const result = await formSchema.spa(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  } else {
    const user = db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? '');
    if (ok) {
      const session = await getSession();
      session.id === user.id;
      redirect('/profile');
    } else {
      return {
        fieldError: {
          password: '비밀번호가 틀립니다.',
          email: [],
        },
      };
    }
  }
}
