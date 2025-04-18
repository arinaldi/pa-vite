import { FormEvent, useTransition } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { toast } from 'sonner';

import { MESSAGES } from '@/lib/constants';
import { revalidateLiveQueries } from '@/lib/live-queries';
import { Callback } from '@/lib/types';
import { capitalizeFirstLetter } from '@/lib/utils';

export interface Options {
  callbacks?: Callback[];
  handleSubmit?: UseFormHandleSubmit<any>;
  submitFn: (data?: any) => Promise<void>;
  successMessage?: string;
}

interface Payload {
  submitting: boolean;
  onSubmit: (event: FormEvent) => Promise<void>;
}

export function useSubmit(options: Options): Payload {
  const [pending, startTransition] = useTransition();
  const { callbacks, handleSubmit, submitFn, successMessage = '' } = options;

  async function handler(data?: any) {
    startTransition(async () => {
      try {
        await submitFn(data);
        await revalidateLiveQueries();

        callbacks?.forEach((c) => {
          c();
        });

        if (successMessage) {
          toast.success(successMessage);
        }
      } catch (error: unknown) {
        let message: string = MESSAGES.ERROR;

        if (error instanceof Error && error.message) {
          message = error.message;
        }

        toast.error(capitalizeFirstLetter(message));
      }
    });
  }

  return {
    onSubmit: handleSubmit ? handleSubmit(handler) : handler,
    submitting: pending,
  };
}
