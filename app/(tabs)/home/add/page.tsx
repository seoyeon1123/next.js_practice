'use client';

import FormInput from '@/components/form-input';
import LoginBtn from '@/components/login-btn';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import AddProduct, { getUploadUrl } from './action';

export default function ProductAdd() {
  const [preview, setPreview] = useState('');
  const [uploadURL, setUploadURL] = useState('');
  const [photoId, setPhotoId] = useState('');
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (!files) {
      return;
    }

    const file = files[0];

    if (!file.type.startsWith('image/')) {
      return alert('이미지 파일만 업로드 가능합니다.');
    }

    const url = URL.createObjectURL(file);
    console.log(url);
    setPreview(url);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadURL(uploadURL);
      setPhotoId(id);
    }
  };

  const interceptAction = async (prevState: any, formData: FormData) => {
    const file = formData.get('photo');
    if (!file) {
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file); // 수정된 부분
    const response = await fetch(uploadURL, {
      method: 'POST',
      body: cloudflareForm,
    });

    if (response.status !== 200) {
      return;
    }

    const photoUrl = `https://imagedelivery.net/2YRH3jpkhrWOOYZOL3zGhA/${photoId}`;
    formData.set('photo', photoUrl);
    return AddProduct(prevState, formData);
  };

  const [state, action] = useFormState(interceptAction, null);
  return (
    <>
      <div>
        <form
          action={action}
          className="flex flex-col justify-center items-center pt-10 gap-5 p-5"
        >
          <label
            htmlFor="photo"
            className="flex flex-col items-center justify-center border-2 aspect-square border-dashed p-10 border-neutral-500  rounded-lg bg-center bg-cover w-80 h-80"
            style={{
              backgroundImage: `url(${preview})`,
            }}
          >
            {preview ? null : (
              <>
                <PhotoIcon className="size-12" />
                <div>이미지를 추가해주세요</div>
              </>
            )}
          </label>
          <input
            id="photo"
            type="file"
            name="photo"
            hidden
            onChange={onImageChange}
          />
          <FormInput
            name="title"
            type="title"
            placeholder="제목"
            required
            errors={state?.fieldErrors.title ?? []}
          />

          <FormInput
            name="price"
            type="number"
            placeholder="가격"
            required
            errors={state?.fieldErrors.price ?? []}
          />
          <FormInput
            name="description"
            type="string"
            placeholder="설명"
            required
            errors={state?.fieldErrors.description ?? []}
          />
          <button className="w-full h-8 bg-blue-500 text-white rounded-md">
            작성 완료
          </button>
        </form>
      </div>
    </>
  );
}
