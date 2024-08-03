'use server';

export async function handleForm(data: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(data.get('email'), data.get('password'));
  console.log('logIn');
}
