import { Link, useLoaderData } from 'react-router';
import { ArrowUp, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSession } from '@/components/session-provider';
import { ROUTE_HREF, SPOTIFY_URL } from '@/lib/constants';
import { capitalizeFirstLetter } from '@/lib/utils';
import { getFavorites } from '@/supabase/data';
import { DecadeSelect } from './decade-select';

export default function TopAlbums() {
  const { favorites } = useLoaderData<typeof getFavorites>();
  const session = useSession();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          className="text-foreground hover:text-muted-foreground text-sm underline underline-offset-4"
          to={ROUTE_HREF.ALL_TIME}
        >
          All-time list
        </Link>
        <DecadeSelect />
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {Object.entries(favorites)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([year, favorites]) => (
            <Card key={year}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle id={year}>{capitalizeFirstLetter(year)}</CardTitle>
                  {session && (
                    <Link to={ROUTE_HREF.EDIT_RANKINGS.replace(':year', year)}>
                      <Button size="icon" variant="outline">
                        <Pencil className="size-4" />
                      </Button>
                    </Link>
                  )}
                </div>
                <CardDescription>
                  {favorites.length.toLocaleString()} album
                  {favorites.length > 1 && 's'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="ml-4 list-decimal space-y-1">
                  {favorites
                    .sort((a, b) => {
                      if (a.ranking > b.ranking) return 1;
                      if (a.ranking < b.ranking) return -1;
                      return 0;
                    })
                    .map((f, index) => {
                      const query = encodeURI(`${f.artist} ${f.title}`);
                      const url = `${SPOTIFY_URL}/${query}`;

                      return (
                        <li
                          key={index}
                          className="text-muted-foreground text-sm"
                        >
                          <span>{f.artist} &ndash;</span>{' '}
                          <a
                            className="text-foreground hover:text-muted-foreground underline underline-offset-4"
                            href={url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {f.title}
                          </a>
                        </li>
                      );
                    })}
                </ol>
              </CardContent>
            </Card>
          ))}
      </div>
      <a
        className="text-muted-foreground fixed right-0 bottom-0 p-5 text-sm"
        href="#top"
      >
        <ArrowUp className="mr-1 inline size-4" />
        <span>Top</span>
      </a>
    </div>
  );
}
