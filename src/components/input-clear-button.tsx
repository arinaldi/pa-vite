import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  onClick: () => void;
}

export default function InputClearButton({ onClick }: Props) {
  return (
    <div className="absolute right-0.5 top-0 flex h-full items-center">
      <Button className="size-8" onClick={onClick} size="icon" variant="ghost">
        <XIcon className="size-4" />
      </Button>
    </div>
  );
}
