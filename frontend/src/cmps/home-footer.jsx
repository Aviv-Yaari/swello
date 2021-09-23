import { ReactComponent as LogoIcon } from '../assets/svg/logo-icon.svg';
import { ReactComponent as LogoText } from '../assets/svg/logo-text.svg';
export const HomeFooter = () => {
  return <footer>
    <div className="logo flex justify-center">
      <LogoIcon />
      <LogoText />
    </div>
    <p> © Copyright 2021. All rights reserved.</p>
  </footer>;
};
