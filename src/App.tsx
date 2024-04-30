import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';

import { Button } from './components/Button';
import { Input } from './components/Input';
import { Label } from './components/Label';

export function App() {
  const form = useForm({
    defaultValues: {
      links: [
        { title: 'Link 01', url: 'https://jstack.com.br' },
        { title: 'Link 02', url: 'https://instagram.com' },
      ],
    },
  });

  const links = useFieldArray({
    control: form.control,
    name: 'links',
  });

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tighter">Links</h1>

        <form className="mt-10 flex flex-col gap-4">
          {links.fields.map((link, index) => (
            <div key={link.id} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" {...form.register(`links.${index}.title`)} />
              </div>

              <div className="flex flex-1 items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="url">Url</Label>
                  <Input id="url" {...form.register(`links.${index}.url`)} />
                </div>

                <Button variant="destructive">
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button className="mt-6 w-full border-dashed" variant="outline">
            <PlusCircleIcon className="mr-1 size-4" />
            Adicionar novo link
          </Button>
        </form>
      </div>
    </div>
  );
}
