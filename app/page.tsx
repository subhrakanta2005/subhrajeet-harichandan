'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

const BOOKS = [
  {
    id: 1,
    title: 'Love Will Find You',
    tag: 'Fiction · Romance · 2022',
    coverClass: 'cover1',
    coverLabel: 'Love Will\nFind You',
    coverSub: '— A Novel —',
    desc: 'Ishaan Malhotra — a serial flirt — meets Aleena Sharma, whose charming eyes could brighten the darkest night. A story of opposites colliding, hearts opening, and love redefining itself.',
    amazon: 'https://www.amazon.in/stores/SUBHRAJEET-HARICHANDAN/author/B0FBH7XDSF?ref=ap_rdr&shoppingPortalEnabled=true',
    flipkart: 'https://www.flipkart.com/love-find-you/p/itme30669a8741e1',
    notion: 'https://notionpress.com/in/read/love-will-find-you-1365976',
  },
  {
    id: 2,
    title: 'Can You Comfort My Aches',
    tag: 'Poetry · Healing · Heartbreak',
    coverClass: 'cover2',
    coverLabel: 'Can You\nComfort\nMy Aches',
    coverSub: '— Poetry —',
    desc: 'A vulnerable collection of poems written throughout the process of overcoming heartbreak. Witness the shift in emotions and the remarkable growth of healing.',
    amazon: 'https://www.amazon.in/stores/SUBHRAJEET-HARICHANDAN/author/B0FBH7XDSF?ref=ap_rdr&shoppingPortalEnabled=true',
    flipkart: 'https://www.flipkart.com/can-you-comfort-my-aches/p/itm43c0330e5904e',
    notion: 'https://notionpress.com/in/read/can-you-comfort-my-aches',
  },
  {
    id: 3,
    title: 'I Had You',
    tag: 'Fiction · Emotions · Memory',
    coverClass: 'cover3',
    coverLabel: 'I Had You',
    coverSub: '— A Story —',
    desc: 'A poignant exploration of connection, loss, and the bittersweet nature of memory. What does it mean to have had someone — and then not?',
    amazon: 'https://www.amazon.in/stores/SUBHRAJEET-HARICHANDAN/author/B0FBH7XDSF?ref=ap_rdr&shoppingPortalEnabled=true',
    flipkart: 'https://www.flipkart.com/i-had-you/p/itm279e417b8ef69',
    notion: 'https://notionpress.com/author/463755',
  },
]

const QUOTES = [
  { text: 'Love is seeing someone at their most vulnerable, often lowest point and reaching out your hand to help them back up. Because love is selfless.', from: '— Love Will Find You' },
  { text: 'From the first poem to the last, you experience the shift in emotions, the change in expression — and witness the growth in the healing process.', from: '— Can You Comfort My Aches' },
  { text: 'Writing books always helped him cope with tragedies and toughness in his life. Every story is a piece of survival.', from: '— On Subhrajeet Harichandan' },
]

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Pro Author', desc: 'Awarded Pro Author status by Notion Press for literary excellence' },
  { icon: '⭐', title: 'Rising Star', desc: 'Recognized as a Rising Star on the Notion Press platform' },
  { icon: '🥉', title: 'Direct Sales Champ', desc: 'Bronze medal for outstanding direct book sales achievement' },
  { icon: '✍️', title: 'Youngest Author', desc: 'Published debut novel in 2022 while still in secondary school, aged 16' },
]

const MARQUEE_ITEMS = [
  'Love Will Find You', 'Can You Comfort My Aches', 'I Had You',
  'Available on Amazon', 'Available on Flipkart', 'Notion Press Author',
  'Born 2005 · Writing Since 2022', 'Bhubaneswar · Odisha · India',
]

export default function Home() {
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 })
  const ringRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  // Cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    document.addEventListener('mousemove', onMove)
    const animate = () => {
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.12
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.12
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Nav scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Quote rotation
  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % QUOTES.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(styles.visible) }),
      { threshold: 0.12 }
    )
    document.querySelectorAll(`.${styles.reveal}`).forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div className={styles.cursor} style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className={styles.cursorRing} style={{ left: ringPos.x, top: ringPos.y }} />

      {/* Stars */}
      <div className={styles.stars} aria-hidden>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className={styles.star} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${0.5 + Math.random() * 2}px`,
            height: `${0.5 + Math.random() * 2}px`,
            animationDuration: `${2 + Math.random() * 4}s`,
            animationDelay: `${-Math.random() * 4}s`,
            ['--o' as any]: 0.2 + Math.random() * 0.7,
          }} />
        ))}
      </div>

      {/* Particles */}
      <div className={styles.particles} aria-hidden>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${6 + Math.random() * 10}s`,
            animationDelay: `${-Math.random() * 15}s`,
            ['--drift' as any]: Math.round((Math.random() - 0.5) * 200),
          }} />
        ))}
      </div>

      {/* NAV */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#" className={styles.navLogo}>S·H</a>
        <ul className={styles.navLinks}>
          <li><a href="#about">About</a></li>
          <li><a href="#books">Books</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#connect">Get Books</a></li>
          <li>
            <a
              href="https://www.amazon.in/stores/SUBHRAJEET-HARICHANDAN/author/B0FBH7XDSF"
              target="_blank" rel="noopener noreferrer"
              className={styles.navCta}
            >Shop Now ↗</a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero" className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Author · Poet · Storyteller</p>
          <h1 className={styles.heroTitle}>
            Subhrajeet<br />
            <em>Harichandan</em>
          </h1>
          <p className={styles.heroSub}>
            Writing that heals. Stories born from real heartbreak, real love, and real life — penned from Bhubaneswar, Odisha.
          </p>
          <div className={styles.heroActions}>
            <a href="#books" className={styles.btnPrimary}><span>Explore Books</span> <span>→</span></a>
            <a href="#about" className={styles.btnGhost}>Meet the Author</a>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <div className={styles.scrollLine} />
          Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className={styles.marqueeSec}>
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={`${styles.marqueeItem} ${i % 3 === 1 ? styles.marqueeHighlight : ''}`}>
              <span className={styles.marqueeDot} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className={styles.about}>
        <div className={styles.aboutGrid}>
          <div className={`${styles.aboutVisual} ${styles.reveal}`}>
            <div className={styles.photoFrame}>
              <div className={styles.photoPlaceholder}>
                <div className={styles.photoRotor} />
                <span className={styles.initials}>SH</span>
              </div>
            </div>
            <span className={styles.corner + ' ' + styles.tl} />
            <span className={styles.corner + ' ' + styles.tr} />
            <span className={styles.corner + ' ' + styles.bl} />
            <span className={styles.corner + ' ' + styles.br} />
            <div className={styles.badge}>
              <div className={styles.badgeInner}>
                <span className={styles.badgeNum}>3+</span>
                <span className={styles.badgeLabel}>Books Published</span>
              </div>
            </div>
          </div>

          <div className={`${styles.aboutText} ${styles.reveal} ${styles.revealDelay1}`}>
            <p className={styles.eyebrow}>The Author</p>
            <h2 className={styles.sectionTitle}>Born to <em>Write,</em><br /><strong>Built by Life</strong></h2>
            <p className={styles.bio}>
              Subhrajeet Harichandan was born on <strong>6 September 2005</strong> in Bhubaneswar, Odisha, India. A voracious reader from childhood, he completed his schooling at MBS Public School and pursued graduation in Commerce at Buxi Jagabandhu Autonomous College.
            </p>
            <p className={styles.bio}>
              His debut novel <em>Love Will Find You</em> was released by Notion Press in <strong>2022</strong> — while he was still in secondary school — making him one of India&apos;s youngest published novelists. Writing has always been his refuge: a way to cope with heartbreak, growth, and the complexities of young life.
            </p>
            <p className={styles.bio}>
              Beyond writing, Subhrajeet is passionate about cricket, chess, and singing — a true Renaissance soul from Odisha with aspirations as big as his stories.
            </p>
            <div className={styles.stats}>
              {[{ n: '3+', l: 'Books Published' }, { n: '2022', l: 'First Published' }, { n: '19', l: 'Age · Born 2005' }].map((s, i) => (
                <div key={i} className={`${styles.statItem} ${styles.reveal} ${styles[`revealDelay${i + 1}` as keyof typeof styles]}`}>
                  <div className={styles.statNum}>{s.n}</div>
                  <div className={styles.statLabel}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOOKS */}
      <section id="books" className={styles.books}>
        <div className={`${styles.booksHeader} ${styles.reveal}`}>
          <p className={`${styles.eyebrow} ${styles.centered}`}>The Collection</p>
          <h2 className={`${styles.sectionTitle} ${styles.centered}`}>Stories That <em>Stay</em><br />With You</h2>
        </div>
        <div className={styles.booksGrid}>
          {BOOKS.map((book, i) => (
            <div key={book.id} className={`${styles.bookCard} ${styles.reveal} ${styles[`revealDelay${i + 1}` as keyof typeof styles]}`}>
              <div className={styles.bookCardInner}>
                <div className={styles.bookCover}>
                  <div className={`${styles.bookCoverArt} ${styles[book.coverClass as keyof typeof styles]}`}>
                    <div className={styles.coverDeco} />
                    <div className={styles.coverShine} />
                    <div className={styles.coverTitleText}>
                      {book.coverLabel.split('\n').map((line, j) => (
                        <span key={j} className={styles.coverMain}>{line}</span>
                      ))}
                      <span className={styles.coverSub}>{book.coverSub}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.bookInfo}>
                  <p className={styles.bookTag}>{book.tag}</p>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookDesc}>{book.desc}</p>
                  <div className={styles.buyLinks}>
                    <a href={book.amazon} target="_blank" rel="noopener noreferrer" className={`${styles.buyLink} ${styles.buyAmazon}`}>Amazon ↗</a>
                    <a href={book.flipkart} target="_blank" rel="noopener noreferrer" className={`${styles.buyLink} ${styles.buyFlipkart}`}>Flipkart ↗</a>
                    <a href={book.notion} target="_blank" rel="noopener noreferrer" className={`${styles.buyLink} ${styles.buyNotion}`}>Notion ↗</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTES */}
      <section id="quotes" className={styles.quotesSection}>
        <div className={styles.quotesContainer}>
          <span className={`${styles.quoteMark} ${styles.reveal}`}>&ldquo;</span>
          <div className={styles.quoteSlider}>
            {QUOTES.map((q, i) => (
              <div key={i} className={`${styles.quoteSlide} ${i === quoteIdx ? styles.activeSlide : ''}`}>
                <p className={styles.quoteText}>{q.text}</p>
                <p className={styles.quoteAuthor}>{q.from}</p>
              </div>
            ))}
          </div>
          <div className={styles.quoteDots}>
            {QUOTES.map((_, i) => (
              <button key={i} className={`${styles.quoteDot} ${i === quoteIdx ? styles.activeDot : ''}`} onClick={() => setQuoteIdx(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className={styles.achievements}>
        <div className={`${styles.reveal} ${styles.centered}`}>
          <p className={`${styles.eyebrow} ${styles.centered}`}>Recognition</p>
          <h2 className={`${styles.sectionTitle} ${styles.centered}`}>Achievements &amp;<br /><em>Milestones</em></h2>
        </div>
        <div className={styles.achievementsGrid}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className={`${styles.achievementCard} ${styles.reveal} ${styles[`revealDelay${(i % 3) + 1}` as keyof typeof styles]}`}>
              <span className={styles.achievementIcon}>{a.icon}</span>
              <div className={styles.achievementTitle}>{a.title}</div>
              <div className={styles.achievementDesc}>{a.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONNECT */}
      <section id="connect" className={styles.connect}>
        <div className={styles.connectBg} />
        <div className={styles.connectContent}>
          <p className={`${styles.eyebrow} ${styles.centered} ${styles.reveal}`}>Get the Books</p>
          <h2 className={`${styles.connectTitle} ${styles.reveal}`}>
            Find Your<br /><em>Next Favourite</em><br />Read
          </h2>
          <p className={`${styles.connectSub} ${styles.reveal} ${styles.revealDelay1}`}>
            Subhrajeet&apos;s books are available across major platforms. Choose your preferred store and start reading today.
          </p>
          <div className={`${styles.platforms} ${styles.reveal} ${styles.revealDelay2}`}>
            <a href="https://www.amazon.in/stores/SUBHRAJEET-HARICHANDAN/author/B0FBH7XDSF?ref=ap_rdr&shoppingPortalEnabled=true" target="_blank" rel="noopener noreferrer" className={`${styles.platformLink} ${styles.plAmazon}`}>
              📦 Amazon India ↗
            </a>
            <a href="https://www.flipkart.com/love-find-you/p/itme30669a8741e1" target="_blank" rel="noopener noreferrer" className={`${styles.platformLink} ${styles.plFlipkart}`}>
              🛍️ Flipkart ↗
            </a>
            <a href="https://notionpress.com/author/463755" target="_blank" rel="noopener noreferrer" className={`${styles.platformLink} ${styles.plNotion}`}>
              📚 Notion Press ↗
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>Subhrajeet Harichandan</div>
        <div className={styles.footerMeta}>
          © 2025 Subhrajeet Harichandan · All rights reserved<br />
          Bhubaneswar, Odisha, India
        </div>
        <div className={styles.footerLinks}>
          <a href="https://www.amazon.in/stores/SUBHRAJEET-HARICHANDAN/author/B0FBH7XDSF" target="_blank" rel="noopener noreferrer">Amazon</a>
          <a href="https://www.flipkart.com/love-find-you/p/itme30669a8741e1" target="_blank" rel="noopener noreferrer">Flipkart</a>
          <a href="https://notionpress.com/author/463755" target="_blank" rel="noopener noreferrer">Notion Press</a>
        </div>
      </footer>
    </>
  )
}
