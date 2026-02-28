// import type { ReactNode } from "react";

// interface Props {
//   children: ReactNode;
//   bg: string | null;
//   id: string;
//   className: string | null;
// }

export default function Section({
  children,
  bg = "",
  id,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`
        min-h-screen
        flex
        items-center
        justify-center
        px-6 md:px-16
        py-20
        ${bg}
        ${className}
      `}
    >
      <div className="w-full max-w-7xl">{children}</div>
    </section>
  );
}
