'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import CinematicLayer from '@/components/CinematicLayer/CinematicLayer';
import { hero, proofPoints } from '@/data/portfolioContent';
import styles from './VideoIntro.module.css';

gsap.registerPlugin(ScrollToPlugin);

export default function VideoIntro() {
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-kicker], [data-hero-name], [data-hero-role], [data-hero-copy], [data-hero-proof], [data-hero-controls]', {
        y: 28,
        opacity: 0,
        duration: 1.25,
        stagger: 0.095,
        ease: 'power4.out',
        delay: 0.12
      });
      gsap.from('[data-video-shell]', {
        scale: 0.965,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      });
    }, rootRef);

    const timer = window.setTimeout(() => setShowHint(false), 6200);
    return () => {
      ctx.revert();
      window.clearTimeout(timer);
    };
  }, []);

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
    setShowHint(false);
    try {
      await video.play();
      setIsPaused(false);
    } catch {
      // Browsers can block playback until a user gesture. The button press is normally enough.
    }
  };

  const togglePlay = async () => {
    const main = videoRef.current;
    const bg = bgVideoRef.current;
    if (!main) return;

    if (main.paused) {
      await main.play();
      await bg?.play();
      setIsPaused(false);
    } else {
      main.pause();
      bg?.pause();
      setIsPaused(true);
    }
  };

  const scrollToNext = () => {
    gsap.to(window, {
      duration: 1.25,
      scrollTo: { y: '#capabilities', offsetY: 0 },
      ease: 'power3.inOut'
    });
  };

  return (
    <section ref={rootRef} className={styles.hero} aria-label="Jaimin Shah cinematic portfolio hero">
      <video
        ref={bgVideoRef}
        className={styles.ambientVideo}
        src="/media/hero-video.mp4"
        poster="/media/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className={styles.darkWash} aria-hidden="true" />
      <div className={styles.practicalLight} aria-hidden="true" />
      <CinematicLayer />

      <div className={styles.inner}>
        <div className={styles.copyBlock}>
          <p data-hero-kicker className={styles.kicker}>{hero.tagline}</p>
          <h1 data-hero-name className={styles.name}>
            <span>Jaimin</span>
            <span>Shah</span>
          </h1>
          <p data-hero-role className={styles.roles}>{hero.roles.join(' • ')}</p>
          <p data-hero-copy className={styles.intro}>{hero.intro}</p>

          <div data-hero-proof className={styles.proofGrid} aria-label="Selected proof points">
            {proofPoints.map((point) => (
              <div key={point.label} className={styles.proofItem}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-video-shell className={styles.videoStage}>
          <div className={styles.videoHalo} aria-hidden="true" />
          <video
            ref={videoRef}
            className={styles.foregroundVideo}
            src="/media/hero-video.mp4"
            poster="/media/hero-poster.jpg"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          />
          {showHint && isMuted ? (
            <button className={styles.soundHint} onClick={toggleMute} type="button" aria-label="Turn on video sound">
              <span /> Tap for sound
            </button>
          ) : null}
        </div>
      </div>

      <div data-hero-controls className={styles.controls} aria-label="Video controls">
        <button type="button" onClick={togglePlay} className={styles.controlButton} aria-label={isPaused ? 'Play hero video' : 'Pause hero video'}>
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button type="button" onClick={toggleMute} className={styles.controlButton} aria-label={isMuted ? 'Unmute hero video' : 'Mute hero video'}>
          {isMuted ? 'Sound on' : 'Mute'}
        </button>
      </div>

      <button type="button" onClick={scrollToNext} className={styles.scrollCue} aria-label="Scroll to portfolio sections">
        <span>Explore work</span>
        <i aria-hidden="true" />
      </button>
    </section>
  );
}
