import { Reorder } from 'framer-motion';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { Button } from './components/Button';
import { LinkItem } from './components/LinkItem';

export function App() {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

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

  const handleSubmit = form.handleSubmit((formData) => {
    console.log({ formData });
  });

  function handleDragStart(index: number) {
    setDraggingIndex(index);
  }

  function handleDragEnd() {
    setDraggingIndex(null);
  }

  function handleReorder(newOrder: typeof links.fields) {
    if (draggingIndex === null) {
      return;
    }

    const dragginLink = links.fields[draggingIndex];

    newOrder.forEach((link, index) => {
      if (link === dragginLink) {
        links.move(draggingIndex, index);
        setDraggingIndex(index);
      }
    });
  }

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-full max-w-2xl">
        <h1 className="mb-10 text-2xl font-semibold tracking-tighter">Links</h1>

        <Button
          className="mb-6 w-full border-dashed"
          variant="outline"
          type="button"
          onClick={() => links.prepend({ title: '', url: '' })}
        >
          <PlusCircleIcon className="mr-1 size-4" />
          Adicionar no topo da lista
        </Button>

        <FormProvider {...form}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Reorder.Group
              axis="y"
              onReorder={handleReorder}
              values={links.fields}
              className="space-y-4"
            >
              {links.fields.map((link, index) => (
                <LinkItem
                  key={link.id}
                  link={link}
                  index={index}
                  IsDraggingActive={
                    draggingIndex === null ? null : draggingIndex === index
                  }
                  onDragStart={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  onRemove={() => links.remove(index)}
                />
              ))}
            </Reorder.Group>

            <Button
              className="mt-6 w-full border-dashed"
              variant="outline"
              type="button"
              onClick={() => links.append({ title: '', url: 'https://' })}
            >
              <PlusCircleIcon className="mr-1 size-4" />
              Adicionar novo link
            </Button>

            <div className="flex gap-4">
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => links.insert(1, { title: '', url: '' })}
              >
                Insert
              </Button>
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => links.move(1, 0)}
              >
                Move
              </Button>
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() =>
                  links.replace([
                    {
                      url: 'anything',
                      title: 'anything',
                    },
                  ])
                }
              >
                Replace
              </Button>
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => links.swap(1, 0)}
              >
                Swap
              </Button>
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() =>
                  links.update(1, {
                    // update DOM, use setValue instead
                    title: 'Updated title',
                    url: 'https://updated.url.com',
                  })
                }
              >
                Update
              </Button>
            </div>

            <Button className="w-full" type="submit">
              Enviar
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
