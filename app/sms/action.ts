'use server';
import crypto from 'crypto';
import { z } from 'zod';
import validator from 'validator';
import { error } from 'console';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import getSession from '@/lib/session';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    '전화번호를 정확하게 입력하세요'
  );

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();

  const exits = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });

  if (exits) {
    return getToken();
  } else {
    return token;
  }
}

async function tokenExists(token: number) {
  const exits = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });

  if (exits) {
    return true;
  } else {
    return false;
  }
}

const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999, '인증번호를 정확하게 입력하세요')
  .refine(tokenExists, 'This token not exits');

interface ActionState {
  token: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    console.log(result.error?.flatten());
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      //기존 token 삭제
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });

      //token 생성
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString('hex'),
                phone: result.data,
              },
            },
          },
        },
      });

      return {
        token: true,
      };
    }
  } else {
    const result = await tokenSchema.safeParseAsync(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });
      const session = await getSession();
      session.id = token?.userId;
      await session.save();

      await db.sMSToken.delete({
        where: {
          id: token!.id,
        },
      });
      redirect('/profile');
    }
  }
}

//token 제거 token 생성, token user랑 연결
//사용자로부터 입력받은 token 일치한지 비교
//로그인 처리
