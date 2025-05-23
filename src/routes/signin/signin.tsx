import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import EmailForm from './email-form';
import OtpForm from './otp-form';
import PasswordForm from './password-form';
import { emailSchema } from './schema';

type View = 'email' | 'password' | 'otp';

export default function SignIn() {
  const [view, setView] = useState<View>('email');
  const form = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema),
  });
  const email = form.watch('email');

  function onCancel() {
    setView('email');
  }

  if (view === 'email') {
    return (
      <EmailForm
        form={form}
        setViewOtp={() => setView('otp')}
        setViewPassword={() => setView('password')}
      />
    );
  }

  if (view === 'password') {
    return <PasswordForm email={email} onCancel={onCancel} />;
  }

  if (view === 'otp') {
    return <OtpForm email={email} onCancel={onCancel} />;
  }

  return null;
}
