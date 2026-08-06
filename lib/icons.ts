import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faInstagram,
  faFacebook,
  faYoutube,
  faTiktok,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const socialIconMap: Record<string, IconDefinition> = {
  github: faGithub,
  linkedin: faLinkedin,
  x: faXTwitter,
  instagram: faInstagram,
  facebook: faFacebook,
  youtube: faYoutube,
  tiktok: faTiktok,
  discord: faDiscord,
  website: faGlobe,
  email: faEnvelope,
};

export function getSocialIcon(key: string): IconDefinition {
  return socialIconMap[key] ?? faGlobe;
}
