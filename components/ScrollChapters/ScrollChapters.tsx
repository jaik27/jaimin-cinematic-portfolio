'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { caseStudies, hero, supportingAssets } from '@/data/portfolioContent';
import styles from './ScrollChapters.module.css';

gsap.registerPlugin(ScrollTrigger);

function MotionVisual({ studyIndex }: { studyIndex: number }) {
  const study = caseStudies[studyIndex];
  const extraSales = study.motion === 'orbit';

  return (
    <div className={`${styles.motionVisual} ${styles[study.motion]}`} data-visual>
      <div className={styles.visualFrame}>
        <img src={study.image} alt={study.imageAlt} loading="lazy" />
      </div>

      {study.motion === 'stack' ? (
        <div className={styles.stackDeck} aria-hidden="true">
          <span>DB</span>
          <span>API</span>
          <span>UI</span>
        </div>
      ) : null}

      {study.motion === 'tunnel' ? (
        <div className={styles.tunnelRings} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      ) : null}

      {study.motion === 'board' ? (
        <div className={styles.opsBoard} aria-hidden="true">
          <span>Audit</span>
          <span>Procurement</span>
          <span>Stock</span>
          <span>CRM</span>
          <span>Report</span>
        </div>
      ) : null}

      {extraSales ? (
        <div className={styles.orbitSet} aria-hidden="true">
          <figure><img src="/media/social-content.jpg" alt="" /></figure>
          <figure><img src="/media/traffic-six-month.png" alt="" /></figure>
          <figure><img src="/media/verified-journalist.webp" alt="" /></figure>
        </div>
      ) : null}

      {study.motion === 'blueprint' ? (
        <div className={styles.blueprintGrid} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : null}
    </div>
  );
}

export default function ScrollChapters() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((chapter) => {
        const motion = chapter.dataset.motion;
        const title = chapter.querySelector('[data-title]');
        const summary = chapter.querySelector('[data-summary]');
        const bullets = chapter.querySelectorAll('[data-bullet]');
        const visual = chapter.querySelector('[data-visual]');
        const metrics = chapter.querySelectorAll('[data-metric]');

        gsap.from([title, summary], {
          y: 46,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: chapter,
            start: 'top 76%'
          }
        });

        gsap.from(bullets, {
          x: -22,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: chapter,
            start: 'top 68%'
          }
        });

        gsap.from(metrics, {
          y: 22,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: chapter,
            start: 'top 64%'
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });

        if (motion === 'stack') {
          tl.fromTo(visual, { rotateY: -12, rotateX: 8, y: 60 }, { rotateY: 12, rotateX: -5, y: -30, ease: 'none' }, 0)
            .to(chapter.querySelectorAll(`.${styles.stackDeck} span`), { z: 70, y: -38, rotate: 8, stagger: 0.08, ease: 'none' }, 0.05);
        }

        if (motion === 'tunnel') {
          tl.fromTo(visual, { scale: 0.92, rotateZ: -1.8 }, { scale: 1.08, rotateZ: 2.2, ease: 'none' }, 0)
            .to(chapter.querySelectorAll(`.${styles.tunnelRings} i`), { rotate: 210, scale: 1.22, opacity: 0.22, stagger: 0.1, ease: 'none' }, 0);
        }

        if (motion === 'board') {
          tl.fromTo(visual, { rotateX: 9, y: 52 }, { rotateX: -4, y: -28, ease: 'none' }, 0)
            .fromTo(chapter.querySelectorAll(`.${styles.opsBoard} span`), { x: -80, opacity: 0.25 }, { x: 90, opacity: 0.8, stagger: 0.05, ease: 'none' }, 0);
        }

        if (motion === 'orbit') {
          tl.fromTo(visual, { rotateY: 10, y: 44 }, { rotateY: -10, y: -34, ease: 'none' }, 0)
            .to(chapter.querySelector(`.${styles.orbitSet}`), { rotate: 42, ease: 'none' }, 0)
            .to(chapter.querySelectorAll(`.${styles.orbitSet} figure`), { rotate: -42, ease: 'none' }, 0);
        }

        if (motion === 'blueprint') {
          tl.fromTo(visual, { rotateX: 10, rotateY: -8, y: 54 }, { rotateX: -3, rotateY: 8, y: -36, ease: 'none' }, 0)
            .to(chapter.querySelectorAll(`.${styles.blueprintGrid} span`), { scaleX: 1.2, scaleY: 1.08, opacity: 0.76, stagger: 0.08, ease: 'none' }, 0);
        }
      });

      gsap.to('[data-marquee-track]', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-marquee]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="capabilities" className={styles.wrap}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Selected capability map</p>
        <h2>Four working identities, one delivery system.</h2>
        <p>
          The portfolio is structured around the way the work actually lands: software, analytics, operations, sales and reporting, backed by journalism-grade research.
        </p>
        <div className={styles.roleChips} aria-label="Portfolio roles">
          {hero.roles.map((role) => <span key={role}>{role}</span>)}
        </div>
      </div>

      <div className={styles.chapters}>
        {caseStudies.map((study, index) => (
          <article key={study.title} className={styles.chapter} data-chapter data-motion={study.motion}>
            <div className={styles.chapterCopy}>
              <p className={styles.eyebrow}>{study.eyebrow}</p>
              <h3 data-title>{study.title}</h3>
              <p data-summary className={styles.summary}>{study.summary}</p>
              <ul className={styles.bulletList}>
                {study.bullets.map((bullet) => <li key={bullet} data-bullet>{bullet}</li>)}
              </ul>
              <div className={styles.metricGrid}>
                {study.metrics.map((metric) => (
                  <div key={metric.label} className={styles.metric} data-metric>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <MotionVisual studyIndex={index} />
          </article>
        ))}
      </div>

      <div className={styles.assetStrip} data-marquee>
        <div className={styles.assetTrack} data-marquee-track>
          {[...supportingAssets, ...supportingAssets].map((asset, index) => (
            <figure key={`${asset.title}-${index}`}>
              <img src={asset.src} alt={asset.title} loading="lazy" />
              <figcaption>{asset.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
