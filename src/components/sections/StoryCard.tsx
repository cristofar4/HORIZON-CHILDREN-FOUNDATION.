import Link from 'next/link';
import type { Story } from '@/data/stories';
import { photos } from '@/lib/images';
import { Photo } from '@/components/ui/Photo';
import { ArrowUpRight } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export function StoryCard({ story, className }: { story: Story; className?: string }) {
  const photo = photos[story.photo];
  return (
    <Link
      href={`/success-stories#${story.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-4xl border border-cream-300/70 bg-cream-50 shadow-soft transition-all duration-500 ease-horizon hover:-translate-y-1.5 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative aspect-[5/6] overflow-hidden">
        <Photo
          src={photo.src}
          alt={photo.alt}
          seed={photo.seed}
          tone={photo.tone}
          className="h-full w-full transition-transform duration-[1.4s] ease-horizon group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 33vw"
          overlay
        />
        <div className="absolute inset-x-5 bottom-5">
          <span className="inline-flex items-center rounded-full bg-cream-50/90 px-3 py-1 text-xs font-semibold text-horizon-700 backdrop-blur">
            {story.program}
          </span>
          <h3 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-cream-50">
            {story.name}, {story.age}
          </h3>
          <p className="text-sm text-cream-100/80">{story.location}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-serif text-lg italic leading-snug text-ink">&ldquo;{story.quote}&rdquo;</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-horizon-700">
          Read {story.name} story
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
