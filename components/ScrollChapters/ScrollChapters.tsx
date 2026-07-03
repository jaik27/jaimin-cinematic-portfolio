'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { caseStudies, hero, supportingAssets } from '@/data/portfolioContent';
import styles from './ScrollChapters.module.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function MotionVisual({ studyIndex }: { studyIndex: number }) {
  const study = caseStudies[studyIndex];
  const extraSales = study.motion === 'orbit';

  return (
    <div className={`${styles.motionVisual} ${styles[study.motion]}`} data-visual>
      <div className={styles.visualFrame} data-visual-frame>
        <img src={study.image} alt={study.imageAlt} loading="lazy" />
      </div>

      {study.motion === 'stack' ? (
        <div className={styles.stackDeck} aria-hidden="true" data-motion-element>
          <span>DB</span>
          <span>API</span>
          <span>UI</span>
        </div>
      ) : null}

      {study.motion === 'tunnel' ? (
        <div className={styles.tunnelRings} aria-hidden="true" data-motion-element>
          <i />
          <i />
          <i />
          <i />
        </div>
      ) : null}

      {study.motion === 'board' ? (
        <div className={styles.opsBoard} aria-hidden="true" data-motion-element>
          <span>Audit</span>
          <span>Procurement</span>
          <span>Stock</span>
          <span>CRM</span>
          <span>Report</span>
        </div>
      ) : null}

      {extraSales ? (
        <div className={styles.orbitSet} aria-hidden="true" data-motion-element>
          <figure><img src="/media/social-content.jpg" alt="" /></figure>
          <figure><img src="/media/traffic-six-month.png" alt="" /></figure>
          <figure><img src="/media/verified-journalist.webp" alt="" /></figure>
        </div>
      ) : null}

      {study.motion === 'blueprint' ? (
        <div className={styles.blueprintGrid} aria-hidden="true" data-motion-element>
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
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = useMemo(
    () => caseStudies.map((study, index) => ({
      id: `chapter-${slugify(study.role)}`,
      role: study.role,
      number: String(index + 1).padStart(2, '0')
    })),
    []
  );

  const goToChapter = (id: string, index: number) => {
    setActiveIndex(index);
    gsap.to(window, {
      duration: 1.05,
      scrollTo: { y: `#${id}`, offsetY: 92 },
      ease: 'power3.inOut'
    });
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]');

      chapters.forEach((chapter, index) => {
        const motion = chapter.dataset.motion;
        const title = chapter.querySelector('[data-title]');
        const summary = chapter.querySelector('[data-summary]');
        const bullets = chapter.querySelectorAll('[data-bullet]');
        const visual = chapter.querySelector('[data-visual]');
        const frame = chapter.querySelector('[data-visual-frame]');
        const metrics = chapter.querySelectorAll('[data-metric]');

        ScrollTrigger.create({
          trigger: chapter,
          start: 'top 52%',
          end: 'bottom 52%',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index)
        });

        if (reduceMotion) return;

        gsap.set([title, summary, bullets, metrics], { opacity: 0 });
        gsap.set(visual, { transformStyle: 'preserve-3d', willChange: 'transform' });
        gsap.set(frame, { willChange: 'transform' });

        gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: 'top 82%',
            toggleActions: 'play none none reverse'
          }
        })
          .fromTo(title, { y: 58, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.05, ease: 'power4.out' })
          .fromTo(summary, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.82, ease: 'power3.out' }, '-=0.72')
          .fromTo(bullets, { x: -26, opacity: 0 }, { x: 0, opacity: 1, duration: 0.68, stagger: 0.075, ease: 'power3.out' }, '-=0.52')
          .fromTo(metrics, { y: 26, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.68, stagger: 0.07, ease: 'power3.out' }, '-=0.44');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
            invalidateOnRefresh: true
          }
        });

        if (motion === 'stack') {
          tl.fromTo(visual, { rotateY: -20, rotateX: 10, y: 86, scale: 0.94 }, { rotateY: 18, rotateX: -6, y: -58, scale: 1.04, ease: 'none' }, 0)
            .fromTo(frame, { z: -80 }, { z: 100, ease: 'none' }, 0)
            .to(chapter.querySelectorAll(`.${styles.stackDeck} span`), { z: 110, y: -72, rotate: 12, stagger: 0.09, ease: 'none' }, 0.05);
        }

        if (motion === 'tunnel') {
          tl.fromTo(visual, { scale: 0.84, rotateZ: -5, y: 64 }, { scale: 1.14, rotateZ: 4, y: -58, ease: 'none' }, 0)
            .fromTo(frame, { rotateY: -16 }, { rotateY: 16, ease: 'none' }, 0)
            .to(chapter.querySelectorAll(`.${styles.tunnelRings} i`), { rotate: 260, scale: 1.35, opacity: 0.3, stagger: 0.08, ease: 'none' }, 0);
        }

        if (motion === 'board') {
          tl.fromTo(visual, { rotateX: 14, rotateY: -8, y: 74 }, { rotateX: -7, rotateY: 8, y: -58, ease: 'none' }, 0)
            .fromTo(chapter.querySelectorAll(`.${styles.opsBoard} span`), { x: -120, opacity: 0.18 }, { x: 105, opacity: 0.92, stagger: 0.045, ease: 'none' }, 0);
        }

        if (motion === 'orbit') {
          tl.fromTo(visual, { rotateY: 18, rotateX: 4, y: 64, scale: 0.96 }, { rotateY: -18, rotateX: -4, y: -60, scale: 1.05, ease: 'none' }, 0)
            .to(chapter.querySelector(`.${styles.orbitSet}`), { rotate: 76, ease: 'none' }, 0)
            .to(chapter.querySelectorAll(`.${styles.orbitSet} figure`), { rotate: -76, y: -28, ease: 'none' }, 0);
        }

        if (motion === 'blueprint') {
          tl.fromTo(visual, { rotateX: 15, rotateY: -12, y: 74, scale: 0.95 }, { rotateX: -6, rotateY: 12, y: -66, scale: 1.04, ease: 'none' }, 0)
            .to(chapter.querySelectorAll(`.${styles.blueprintGrid} span`), { scaleX: 1.26, scaleY: 1.12, opacity: 0.82, stagger: 0.075, ease: 'none' }, 0);
        }
      });

      if (!reduceMotion) {
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
      }

      ScrollTrigger.refresh();
    }, rootRef);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id="capabilities" className={styles.wrap}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Selected capability map</p>
        <h2>Five working identities, one delivery system.</h2>
        <p>
          The portfolio is structured around the way the work actually lands: software, analytics, operations, sales and reporting, backed by journalism-grade research.
        </p>
        <div className={styles.roleChips} aria-label="Portfolio section navigation">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              className={activeIndex === index ? styles.activeChip : undefined}
              onClick={() => goToChapter(tab.id, index)}
              aria-current={activeIndex === index ? 'true' : undefined}
            >
              <small>{tab.number}</small>
              <span>{tab.role}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chapters}>
        {caseStudies.map((study, index) => (
          <article
            key={study.title}
            id={tabs[index].id}
            className={styles.chapter}
            data-chapter
            data-motion={study.motion}
          >
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
