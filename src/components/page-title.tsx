import { Fragment } from 'react/jsx-runtime';
import { useLocation, useMatches, useNavigate } from 'react-router';

import { Badge } from '@/components/ui/badge';
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMobile } from '@/hooks/use-mobile';

type LoaderData = {
  count: number;
  parents?: {
    href: string;
    title: string;
  }[];
  title: string;
};

export default function PageTitle() {
  const mobile = useMobile();
  const { pathname } = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();
  const match = matches.find((m) => m.pathname === pathname);
  const data = match?.data as LoaderData;

  if (!data) return null;

  return (
    <>
      {mobile && data.parents && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-1 md:hidden"
              aria-label="Toggle menu"
            >
              <BreadcrumbEllipsis className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {data.parents.map((p) => (
                <DropdownMenuItem
                  key={p.href}
                  onSelect={() => navigate(p.href)}
                >
                  {p.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <BreadcrumbSeparator />
        </>
      )}
      {!mobile &&
        data.parents?.map((p) => (
          <Fragment key={p.href}>
            <BreadcrumbItem>
              <BreadcrumbLink to={p.href}>{p.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
      <BreadcrumbItem>
        <BreadcrumbPage>
          <span className="flex items-center gap-2">
            <span>{data.title}</span>
            {data.count !== undefined && (
              <Badge variant="secondary">{data.count.toLocaleString()}</Badge>
            )}
          </span>
        </BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}
