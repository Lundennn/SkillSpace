export const Icon = ({ name, size = 16 }) => {
  const icons = {
    'arrow-left': (
      <>
        <path d="M10 12L6 8l4-4" />
        <path d="M6 8h7" />
      </>
    ),
    'arrow-right': (
      <>
        <path d="M3 8h10" />
        <path d="M9 4l4 4-4 4" />
      </>
    ),
    eye: (
      <>
        <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z" />
        <circle cx="8" cy="8" r="2" />
      </>
    ),
    'eye-off': (
      <>
        <path d="M2 2l12 12" />
        <path d="M6.7 6.7a2 2 0 002.6 2.6" />
        <path d="M4.2 4.3C2.6 5.4 1.5 8 1.5 8s2.5 4.5 6.5 4.5c1.5 0 2.8-.5 3.9-1.2" />
        <path d="M10.5 4.1C9.7 3.7 8.9 3.5 8 3.5c-1.1 0-2.1.3-3 .8" />
        <path d="M13.2 6.2C14.1 7.2 14.5 8 14.5 8s-.8 1.5-2.2 2.8" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};