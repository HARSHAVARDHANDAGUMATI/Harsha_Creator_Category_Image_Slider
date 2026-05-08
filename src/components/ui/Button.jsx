import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white shadow-[0_12px_30px_rgba(3,7,18,0.35)] backdrop-blur-xl transition duration-300',
          'hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:shadow-[0_0_35px_rgba(34,211,238,0.2)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
