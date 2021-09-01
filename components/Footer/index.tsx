import Image from 'next/image';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoGithub,
  IoHeart
} from 'react-icons/io5';

import settings from '~/data/settings.json';
import social from '~/data/social.json';

import styles from './style.module.css';

const logos = {
  facebook: IoLogoFacebook,
  instagram: IoLogoInstagram,
  twitter: IoLogoTwitter,
  github: IoLogoGithub
};

interface SocialIconProps {
  name: string;
  url: string;
  username: string;
  tag: string;
}

const SocialIcon = ({ name, url, username, tag }: SocialIconProps) => {
  const Icon = logos[tag];

  return (
    <a href={`${url}/${username}`}>
      <Icon title={name} size="1.5em" />
    </a>
  );
};

const Footer = ({ isDarkBackground = false }) => (
  <footer className={styles.footer}>
    <div className={`${styles.social} ${isDarkBackground ? styles.darkmode : styles.lightmode}`}>
      {social.map((entry: SocialIconProps) => (
        <SocialIcon key={entry.tag} {...entry} />
      ))}
    </div>
    <div className={`${styles.copyright} ${isDarkBackground ? styles.darkmode : styles.lightmode}`}>
      <a href={settings.domain} target="_blank" rel="noopener noreferrer">
        hacked with <IoHeart className={styles.heart} size="1.2em" /> by
        <Image
          width={121}
          height={30}
          src={isDarkBackground ? '/logo-lettering-light.svg' : '/logo-lettering-dark.svg'}
          alt="CoderDojo's Logo"
        />
      </a>
    </div>
  </footer>
);

export default Footer;
