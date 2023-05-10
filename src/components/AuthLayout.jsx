import FooterSvgLight from "../resources/svg/wave-2color-light.svg";

// eslint-disable-next-line react/prop-types
export default function AuthLayout({ children }) {
  return (
    <div className="relative">
      {children}
      <img
        src={FooterSvgLight}
        alt="..."
        className="absolute bottom-0 w-screen"
      />
    </div>
  );
}
