import { boolean, z } from 'zod';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import getSession from '@/lib/session';

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '존재하는 username입니다.',
      })
      .trim(),
    email: z.string().email().trim(),
    password: z.string().min(5, 'too short').max(10, 'too long'),
    confirmPassword: z.string().min(5, 'too short').max(10, 'too long'),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 존재하는 username 입니다.',
        path: ['username'],
        fatal: true,
      });
    }
    return z.NEVER;
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 존재하는 email 입니다.',
        path: ['email'],
        fatal: true,
      });
    }
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: '비밀번호를 일치하게 입력하세요',
    path: ['confirmPassword'],
  });

export async function Signup(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const result = await formSchema.safeParseAsync(data);
  console.log(result.error?.flatten());
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashPassword = await bcrypt.hash(result.data.password, 12);

    const user = db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = (await user).id;
    session.save();
  }
}
