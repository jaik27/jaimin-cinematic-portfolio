import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.card}>
        <p className={styles.kicker}>Ready for a focused conversation</p>
        <h2>Systems, analytics, operations and digital growth in one portfolio.</h2>
        <p>
          Built to be sent as a single WhatsApp link, opened on a phone, and understood quickly by founders, operators, editors and technical teams.
        </p>
        <div className={styles.actions}>
          <a href="mailto:jaiminkenya97@gmail.com">Email Jaimin</a>
          <a href="https://www.linkedin.com/in/jaiminshah2" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://jaysvancouver.com" target="_blank" rel="noreferrer">Jay’s Vancouver</a>
        </div>
      </div>
    </footer>
  );
}
