import './Button.css';

export const Button = ({
                         children,
                         variant = 'accent',
                         type = 'button',
                         fullWidth = true,
                         ...props
                       }) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};