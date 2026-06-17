import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight } from '@/components/ui/icons';

type Variant = 'primary' | 'dawn' | 'ghost' | 'light';

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'btn-primary',
  dawn: 'btn-dawn',
  ghost: 'btn-ghost',
  light: 'btn-light',
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Shared call to action button that renders as a link or a button. */
export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className, withArrow, ...rest } = props;
  const classes = cn(VARIANT_CLASS[variant], 'group', className);

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-horizon group-hover:translate-x-1" />
      )}
    </>
  );

  if ('href' in props && props.href) {
    const { href, external, ...anchorRest } = rest as ButtonAsLink;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" className={classes} {...anchorRest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
