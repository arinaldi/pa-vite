import { useRef, useState } from 'react';
import { useLoaderData } from 'react-router';

import AppLayout from '@/components/app-layout';
import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputClearButton from '@/components/input-clear-button';
import InputSpinner from '@/components/input-spinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
// import { cn } from '@/lib/utils';
import { getArtists } from '@/supabase/data';
// import { MESSAGES } from '@/utils/constants';
import Random from './random';

export default function Artists() {
  const { artists } = useLoaderData<typeof getArtists>();
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [fetching] = useState(false);
  // const [results, setResults] = useState<State>({
  //   artist: '',
  //   data: [],
  //   token: '',
  //   type: 'releases',
  // });
  const filteredArtists = search
    ? artists.filter((a) => a.toLowerCase().includes(search.toLowerCase()))
    : artists;

  /*
  async function fetchReleases(artist: string) {
    let { token } = results;
    setFetching(true);

    try {
      if (!token) {
        token = await getAccessToken();

        if (!token) {
          throw new Error('No access token');
        }
      }

      const artistId = await getArtistId(token, artist);

      if (!artistId) {
        throw new Error('No artist ID');
      }

      const data = await getArtistAlbums(token, artistId);

      if (!data) {
        throw new Error('Failed to fetch releases');
      }

      setResults({
        artist,
        data: data.sort(sortByDateDesc),
        token,
        type: 'releases',
      });
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : MESSAGES.ERROR;

      toast.error(message);
    }

    setFetching(false);
  }
  */

  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>Artists</span>
          <Badge variant="secondary">
            {filteredArtists.length.toLocaleString()}
          </Badge>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
        <div className="flex shrink-0 flex-col gap-4">
          <div className="relative">
            <Input
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              ref={searchRef}
              value={search}
            />
            {!fetching && search && (
              <InputClearButton
                onClick={() => {
                  setSearch('');
                  searchRef?.current?.focus();
                }}
              />
            )}
            {fetching && <InputSpinner />}
          </div>
          <ScrollArea className="max-h-[400px] rounded-md border sm:max-h-[800px]">
            <div className="p-4">
              {filteredArtists.map((a, index) => {
                // if (user) {
                //   return (
                //     <div key={a}>
                //       <Button
                //         className={cn(
                //           'block h-auto px-0 py-0.5 text-left text-sm',
                //           results.artist === a
                //             ? 'font-semibold'
                //             : 'font-normal',
                //         )}
                //         disabled={fetching}
                //         onClick={() => fetchReleases(a)}
                //         size="sm"
                //         variant="link"
                //       >
                //         {a}
                //       </Button>
                //       {index !== filteredArtists.length - 1 && (
                //         <Separator className="my-2" />
                //       )}
                //     </div>
                //   );
                // }

                return (
                  <div key={a}>
                    <p className="text-sm">{a}</p>
                    {index !== filteredArtists.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
        <div className="flex shrink-0 flex-col gap-4">
          <Random artists={artists} />
          {/* {results.type === 'releases' && results.data.length > 0 && (
            <ScrollArea className="max-h-[400px] rounded-md border sm:max-h-[800px]">
              <div className="p-4">
                <h4 className="text-sm font-medium">
                  {results.data.length.toLocaleString()}{' '}
                  {results.data.length === 1 ? 'release' : 'releases'}
                </h4>
                <ul className="mt-4 space-y-4">
                  {results.data.map((item) => (
                    <li className="space-y-1 text-sm" key={item.id}>
                      <a
                        className={cn(
                          'block underline underline-offset-4 hover:text-muted-foreground',
                          item.type === 'album' ? 'font-medium' : 'font-light',
                        )}
                        href={item.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.name}
                      </a>
                      <p className="font-light text-muted-foreground">
                        {item.date}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          )} */}
          {/* {results.type === 'related' && results.data.length > 0 && (
            <ScrollArea className="max-h-[400px] rounded-md border sm:max-h-[800px]">
              <div className="p-4">
                <h4 className="text-sm font-medium">
                  {results.data.length.toLocaleString()}{' '}
                  {results.data.length === 1
                    ? 'related artist'
                    : 'related artists'}
                </h4>
                <ul className="mt-4 space-y-4">
                  {results.data.map((item) => (
                    <li className="text-sm" key={item.id}>
                      <a
                        className="block underline underline-offset-4 hover:text-muted-foreground"
                        href={item.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          )} */}
        </div>
      </div>
    </AppLayout>
  );
}
