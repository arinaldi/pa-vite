import { useRevalidator } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES } from '@/lib/constants';
import { Song } from '@/lib/types';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/supabase/client';
import { songSchema, type SongInput } from './schema';
import SongForm from './song-form';

interface Props {
  onClose: () => void;
  song: Song;
}

export default function EditSongModal({ onClose, song }: Props) {
  const { revalidate } = useRevalidator();
  const form = useForm<SongInput>({
    defaultValues: {
      artist: song.artist,
      title: song.title,
      link: song.link,
    },
    resolver: zodResolver(songSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose, revalidate],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: SongInput) => {
      const { error } = await supabase
        .from('songs')
        .update(data)
        .eq('id', song.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} edited`,
  });

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Edit song</DialogTitle>
        <DialogDescription>Update data for featured song</DialogDescription>
      </DialogHeader>
      <SongForm form={form} onSubmit={onSubmit} submitting={submitting} />
    </DialogContent>
  );
}
