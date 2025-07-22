
export interface Memory {
  id: number;
  src: string;
  caption: string;
  date?: string;
}

export interface Wish {
  id: string;
  text: string;
  timestamp: Date;
  author?: string;
}
export interface UseAudioReturn {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  play: () => void;
  pause: () => void;
}

export interface UseTypingAnimationReturn {
  text: string;
  start: () => void;
  stop: () => void;
}

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface HeroSectionProps extends BaseComponentProps {
  name?: string;
  photoSrc?: string;
  photoAlt?: string;
}

export interface BirthdayCakeProps extends BaseComponentProps {
  candleCount?: number;
  onWishMade?: () => void;
}

export interface PhotoCarouselProps extends BaseComponentProps {
  memories: Memory[];
  autoplay?: boolean;
  slidesPerView?: number;
}

export interface TypingMessageProps extends BaseComponentProps {
  message: string;
  speed?: number;
  startDelay?: number;
}

export interface WishWallProps extends BaseComponentProps {
  onWishSubmit?: (wish: string) => void;
  maxWishes?: number;
}

export interface GiftBoxProps extends BaseComponentProps {
  surpriseContent?: React.ReactNode;
  surpriseImageSrc?: string;
  surpriseImageAlt?: string;
}