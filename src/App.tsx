import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

type Page = "home" | "katalog" | "detail" | "kredit" | "promo" | "kontak";
type IconName =
  | "arrow"
  | "calculator"
  | "car"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "filter"
  | "map"
  | "menu"
  | "message"
  | "search"
  | "shield"
  | "spark"
  | "user";

const IMG = {
  suv: "https://images.unsplash.com/photo-1786405454372-3fe75969c6b9?auto=format&fit=crop&w=1400&q=85",
  suv2: "https://images.unsplash.com/photo-1622210642960-0f6a2cdbdc9f?auto=format&fit=crop&w=1200&q=85",
  sedan:
    "https://images.unsplash.com/photo-1722088386522-7cafb8a7e234?auto=format&fit=crop&w=1200&q=85",
  red: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=85",
  city: "https://images.unsplash.com/photo-1648178326808-30e03de8049d?auto=format&fit=crop&w=1200&q=85",
  interior:
    "https://images.unsplash.com/photo-1658285226355-7490109e090f?auto=format&fit=crop&w=1200&q=85",
};

const cars = [
  {
    id: 1,
    name: "Honda WR-V",
    brand: "Honda",
    body: "SUV",
    price: 284900000,
    promo: "DP mulai 15%",
    image: IMG.suv,
  },
  {
    id: 2,
    name: "Toyota Yaris Cross",
    brand: "Toyota",
    body: "SUV",
    price: 351000000,
    promo: "Bonus servis",
    image: IMG.suv2,
  },
  {
    id: 3,
    name: "Honda City Hatchback",
    brand: "Honda",
    body: "Hatchback",
    price: 352500000,
    promo: "Bunga ringan",
    image: IMG.city,
  },
  {
    id: 4,
    name: "Toyota Vios",
    brand: "Toyota",
    body: "Sedan",
    price: 373100000,
    promo: "Cashback spesial",
    image: IMG.sedan,
  },
  {
    id: 5,
    name: "Suzuki Grand Vitara",
    brand: "Suzuki",
    body: "SUV",
    price: 362000000,
    promo: "Gratis asuransi",
    image: IMG.red,
  },
  {
    id: 6,
    name: "Mitsubishi Xforce",
    brand: "Mitsubishi",
    body: "SUV",
    price: 388000000,
    promo: "TDP ringan",
    image: IMG.suv,
  },
];

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Katalog", page: "katalog" },
  { label: "Simulasi Kredit", page: "kredit" },
  { label: "Promo", page: "promo" },
  { label: "Kontak", page: "kontak" },
];

const formatPrice = (value: number) => `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
const shortPrice = (value: number) => `${Math.round(value / 1000000)} jt`;

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    calculator: (
      <>
        <rect x="5" y="2.5" width="14" height="19" rx="2" />
        <path d="M8 6h8v4H8zM8.5 14h.01M12 14h.01M15.5 14h.01M8.5 17.5h.01M12 17.5h.01M15.5 17.5h.01" />
      </>
    ),
    car: (
      <>
        <path d="m5 11 1.5-4h11l1.5 4" />
        <path d="M3.5 11h17v7h-17zM6 18v2M18 18v2M7 14h.01M17 14h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    filter: (
      <>
        <path d="M4 6h16M7 12h10M10 18h4" />
      </>
    ),
    map: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-4-.9L3 21l1.8-4.7A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M8.5 9.5c.6 2.3 1.8 3.5 4 4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3-1.2 4.4L7 9l3.8 1.6L12 15l1.2-4.4L17 9l-3.8-1.6L12 3Z" />
        <path d="m5 14-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.8-4.2 3.5-6 8-6s7.2 1.8 8 6" />
      </>
    ),
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function go(page: Page, id?: number) {
  window.location.hash = id ? `${page}?id=${id}` : page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Logo() {
  return (
    <button className="logo" onClick={() => go("home")} aria-label="Jamsmotor home">
      <span>J</span>
      <strong>Jamsmotor</strong>
    </button>
  );
}

function Navigation({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-shell">
      <nav className="container nav">
        <Logo />
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={
                page === item.page || (page === "detail" && item.page === "katalog") ? "active" : ""
              }
              onClick={() => go(item.page)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="nav-contact" onClick={() => go("kontak")}>
          Hubungi Sales <Icon name="arrow" size={17} />
        </button>
        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Buka menu">
          <Icon name="menu" />
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-head">
            <Logo />
            <button onClick={() => setOpen(false)} aria-label="Tutup menu">
              <Icon name="close" />
            </button>
          </div>
          <div>
            {navItems.map((item, i) => (
              <button
                key={item.page}
                onClick={() => {
                  go(item.page);
                  setOpen(false);
                }}
              >
                <span>0{i + 1}</span>
                {item.label}
                <Icon name="arrow" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>Temukan mobil yang pas, tanpa proses yang rumit.</p>
        </div>
        <div>
          <span className="footer-label">Kunjungi kami</span>
          <p>
            Ruko Tiban BTN
            <br />
            Batam, Kepulauan Riau
          </p>
        </div>
        <div>
          <span className="footer-label">Jam buka</span>
          <p>
            Senin – Sabtu, 08.30 – 17.30
            <br />
            Minggu dengan perjanjian
          </p>
        </div>
      </div>
      <div className="container copyright">
        <span>© 2026 Jamsmotor</span>
        <span>Dealer mobil pilihan di Batam</span>
      </div>
    </footer>
  );
}

function WhatsAppButton({
  label = "Hubungi via WhatsApp",
  light = false,
}: {
  label?: string;
  light?: boolean;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : "button-dark"}`}
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="message" />
      {label}
      <Icon name="arrow" />
    </a>
  );
}

function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-header container">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function CarCard({ car }: { car: (typeof cars)[number] }) {
  return (
    <article className="car-card" onClick={() => go("detail", car.id)}>
      <div className="car-image">
        <img src={car.image} alt={car.name} />
        <span className="promo-tag">{car.promo}</span>
        <button aria-label={`Lihat ${car.name}`}>
          <Icon name="arrow" />
        </button>
      </div>
      <div className="car-info">
        <div>
          <span>{car.body}</span>
          <h3>{car.name}</h3>
        </div>
        <p>
          Mulai dari <strong>{formatPrice(car.price)}</strong>
        </p>
      </div>
    </article>
  );
}

function Cta({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <section className="container cta">
      <div>
        <span className="eyebrow eyebrow-light">Bicarakan kebutuhanmu</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {action || <WhatsAppButton light />}
    </section>
  );
}

function Home() {
  const [brand, setBrand] = useState("");
  const [budget, setBudget] = useState("");
  const search = () => {
    sessionStorage.setItem("carSearch", JSON.stringify({ brand, budget }));
    go("katalog");
  };
  return (
    <>
      <section className="hero">
        <div className="hero-image">
          <img src={IMG.suv} alt="SUV putih modern pilihan Jamsmotor" />
        </div>
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light">Dealer mobil • Ruko Tiban BTN</span>
            <h1>
              Mobil yang tepat,
              <br />
              <em>lebih mudah ditemukan.</em>
            </h1>
            <p>Bandingkan tipe, pahami promo, dan hitung cicilanmu dalam satu tempat.</p>
          </div>
          <div className="quick-search">
            <div className="search-title">
              <Icon name="search" />
              <strong>Cari mobil dengan cepat</strong>
            </div>
            <label>
              <span>Merek</span>
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">Semua merek</option>
                <option>Honda</option>
                <option>Toyota</option>
                <option>Suzuki</option>
                <option>Mitsubishi</option>
              </select>
            </label>
            <label>
              <span>Budget maksimal</span>
              <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">Pilih budget</option>
                <option value="300000000">Rp 300 juta</option>
                <option value="400000000">Rp 400 juta</option>
                <option value="500000000">Rp 500 juta</option>
              </select>
            </label>
            <button className="button button-accent" onClick={search}>
              Lihat pilihan mobil <Icon name="arrow" />
            </button>
          </div>
        </div>
      </section>

      <section className="container services section">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Lebih praktis</span>
            <h2>
              Semua yang kamu butuhkan,
              <br />
              tanpa bolak-balik bertanya.
            </h2>
          </div>
          <p>Kami membantu dari memilih unit sampai memahami pilihan kredit.</p>
        </div>
        <div className="service-grid">
          {[
            [
              "car",
              "Penjualan Mobil",
              "Beragam merek dan tipe, dipilih sesuai kebutuhan dan anggaranmu.",
            ],
            [
              "shield",
              "Garansi Unit",
              "Informasi kondisi dan perlindungan unit dijelaskan dengan transparan.",
            ],
            [
              "calculator",
              "Konsultasi Kredit",
              "Bandingkan DP, tenor, dan estimasi cicilan sebelum memutuskan.",
            ],
          ].map(([icon, title, text], i) => (
            <article className="service-card" key={title}>
              <span className="service-no">0{i + 1}</span>
              <div className="icon-box">
                <Icon name={icon as IconName} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="featured section">
        <div className="container">
          <div className="section-heading row">
            <div>
              <span className="eyebrow">Pilihan minggu ini</span>
              <h2>Mobil unggulan</h2>
            </div>
            <button className="text-link" onClick={() => go("katalog")}>
              Lihat semua mobil <Icon name="arrow" />
            </button>
          </div>
          <div className="car-grid">
            {cars.slice(0, 3).map((car) => (
              <CarCard car={car} key={car.id} />
            ))}
          </div>
        </div>
      </section>
      <Cta
        title="Masih bingung memilih?"
        text="Ceritakan kebutuhan dan budgetmu. Sales kami akan bantu memberi pilihan yang masuk akal."
      />
    </>
  );
}

function Katalog() {
  const saved = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("carSearch") || "{}");
    } catch {
      return {};
    }
  })();
  const [query, setQuery] = useState(saved.brand || "");
  const [brand, setBrand] = useState(saved.brand || "");
  const [body, setBody] = useState("");
  const [max, setMax] = useState(saved.budget || "");
  const [filterOpen, setFilterOpen] = useState(false);
  useEffect(() => {
    sessionStorage.removeItem("carSearch");
  }, []);
  const filtered = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(query.toLowerCase()) &&
      (!brand || car.brand === brand) &&
      (!body || car.body === body) &&
      (!max || car.price <= Number(max)),
  );
  return (
    <>
      <PageHeader
        eyebrow="Katalog mobil"
        title="Temukan mobil yang sesuai."
        text="Gunakan pencarian dan filter untuk mempersempit pilihanmu."
      />
      <main className="container catalog-section">
        <div className="catalog-search">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama mobil..."
          />
          <button onClick={() => setFilterOpen(!filterOpen)}>
            <Icon name="filter" /> Filter
          </button>
        </div>
        <div className={`filters ${filterOpen ? "show" : ""}`}>
          <label>
            <span>Merek</span>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Semua merek</option>
              <option>Honda</option>
              <option>Toyota</option>
              <option>Suzuki</option>
              <option>Mitsubishi</option>
            </select>
          </label>
          <label>
            <span>Jenis bodi</span>
            <select value={body} onChange={(e) => setBody(e.target.value)}>
              <option value="">Semua jenis</option>
              <option>SUV</option>
              <option>Sedan</option>
              <option>Hatchback</option>
            </select>
          </label>
          <label>
            <span>Harga maksimal</span>
            <select value={max} onChange={(e) => setMax(e.target.value)}>
              <option value="">Semua harga</option>
              <option value="300000000">Rp 300 juta</option>
              <option value="375000000">Rp 375 juta</option>
              <option value="450000000">Rp 450 juta</option>
            </select>
          </label>
          <button
            className="reset"
            onClick={() => {
              setBrand("");
              setBody("");
              setMax("");
              setQuery("");
            }}
          >
            Hapus filter
          </button>
        </div>
        <div className="result-line">
          <span>{filtered.length} mobil ditemukan</span>
          <span>Harga OTR Batam</span>
        </div>
        {filtered.length ? (
          <div className="car-grid catalog-grid">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <Icon name="search" size={30} />
            <h3>Mobil belum ditemukan</h3>
            <p>Coba ubah kata pencarian atau hapus filter.</p>
          </div>
        )}
      </main>
    </>
  );
}

function Detail({ id }: { id: number }) {
  const car = cars.find((item) => item.id === id) || cars[0];
  const variants = [
    { name: `${car.name} 1.5 E MT`, price: car.price },
    { name: `${car.name} 1.5 E CVT`, price: car.price + 14500000 },
    { name: `${car.name} 1.5 RS CVT`, price: car.price + 43500000 },
  ];
  return (
    <>
      <main className="container detail">
        <button className="back-link" onClick={() => go("katalog")}>
          ← Kembali ke katalog
        </button>
        <div className="detail-gallery">
          <div className="detail-main">
            <img src={car.image} alt={car.name} />
            <span>{car.promo}</span>
          </div>
          <div>
            <img src={IMG.interior} alt={`Interior ${car.name}`} />
            <img src={IMG.suv2} alt={`${car.name} tampak samping`} />
          </div>
        </div>
        <section className="detail-overview">
          <div>
            <span className="eyebrow">
              {car.brand} • {car.body}
            </span>
            <h1>{car.name}</h1>
            <p>SUV ringkas dengan kabin nyaman untuk penggunaan harian dan perjalanan keluarga.</p>
          </div>
          <div className="start-price">
            <span>Harga mulai dari</span>
            <strong>{formatPrice(car.price)}</strong>
            <small>OTR Batam • Harga dapat berubah</small>
          </div>
        </section>
        <section className="variant-section">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">Daftar varian</span>
              <h2>Pilih varianmu</h2>
            </div>
            <p>Perbedaan utama ada pada transmisi dan fitur kenyamanan.</p>
          </div>
          <div className="variant-list">
            {variants.map((v, i) => (
              <div key={v.name}>
                <span className="variant-num">0{i + 1}</span>
                <strong>{v.name}</strong>
                <span>{formatPrice(v.price)}</span>
                <button onClick={() => go("kredit")}>
                  <Icon name="calculator" /> Hitung cicilan
                </button>
              </div>
            ))}
          </div>
          <div className="terms">
            <strong>Arti kode varian</strong>
            <div>
              {[
                ["CVT", "Transmisi otomatis halus"],
                ["AT", "Transmisi otomatis"],
                ["MT", "Transmisi manual"],
                ["HEV", "Mesin hybrid bensin-listrik"],
              ].map(([a, b]) => (
                <span key={a}>
                  <b>{a}</b>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>
        <section className="specs">
          <div>
            <span className="eyebrow">Spesifikasi singkat</span>
            <h2>Nyaman untuk setiap perjalanan.</h2>
          </div>
          <div className="spec-grid">
            {[
              ["Mesin", "1.5L DOHC"],
              ["Kapasitas", "5 penumpang"],
              ["Tenaga", "121 PS"],
              ["Bagasi", "380 liter"],
              ["Keamanan", "6 airbags"],
              ["Garansi", "3 tahun"],
            ].map(([a, b]) => (
              <div key={a}>
                <span>{a}</span>
                <strong>{b}</strong>
              </div>
            ))}
          </div>
        </section>
        <div className="detail-actions">
          <button className="button button-accent" onClick={() => go("kredit")}>
            <Icon name="calculator" /> Simulasi Kredit
          </button>
          <WhatsAppButton label="WhatsApp" />
          <button className="button button-outline" onClick={() => go("kontak")}>
            <Icon name="clock" /> Jadwalkan Test Drive
          </button>
        </div>
      </main>
    </>
  );
}

function Kredit() {
  const [price, setPrice] = useState(300000000);
  const [dpPercent, setDpPercent] = useState(20);
  const [tenor, setTenor] = useState(60);
  const [result, setResult] = useState<number | null>(null);
  const calculate = () => {
    const loan = price * (1 - dpPercent / 100);
    const annualRate = 0.065;
    setResult(Math.round((loan + loan * annualRate * (tenor / 12)) / tenor));
  };
  return (
    <>
      <PageHeader
        eyebrow="Simulasi kredit"
        title="Hitung cicilan, sesuaikan rencana."
        text="Dapatkan estimasi awal agar kamu lebih mudah menentukan pilihan."
      />
      <main className="container credit-layout">
        <section className="credit-form">
          <div className="form-head">
            <span>01</span>
            <div>
              <h2>Masukkan rencana pembelian</h2>
              <p>Ubah nominal sesuai kebutuhanmu.</p>
            </div>
          </div>
          <label>
            <span>Harga mobil</span>
            <div className="prefix-input">
              <b>Rp</b>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </label>
          <label>
            <span>Uang muka (DP)</span>
            <div className="range-label">
              <strong>{dpPercent}%</strong>
              <small>{formatPrice((price * dpPercent) / 100)}</small>
            </div>
            <input
              className="range"
              type="range"
              min="10"
              max="50"
              step="5"
              value={dpPercent}
              onChange={(e) => setDpPercent(Number(e.target.value))}
            />
            <div className="range-scale">
              <span>10%</span>
              <span>50%</span>
            </div>
          </label>
          <label>
            <span>Tenor</span>
            <div className="tenor-options">
              {[12, 24, 36, 48, 60].map((item) => (
                <button
                  className={tenor === item ? "selected" : ""}
                  onClick={() => setTenor(item)}
                  key={item}
                >
                  {item / 12} th
                </button>
              ))}
            </div>
          </label>
          <button className="button button-accent calculate" onClick={calculate}>
            <Icon name="calculator" /> Hitung Estimasi
          </button>
        </section>
        <aside className={`credit-result ${result ? "has-result" : ""}`}>
          <span className="eyebrow eyebrow-light">Hasil estimasi</span>
          <p>Perkiraan cicilan per bulan</p>
          <strong>{result ? formatPrice(result) : "Rp —"}</strong>
          <div>
            <span>
              Uang muka<b>{formatPrice((price * dpPercent) / 100)}</b>
            </span>
            <span>
              Tenor<b>{tenor} bulan</b>
            </span>
          </div>
          <small>
            Estimasi menggunakan bunga flat 6,5% per tahun. Hasil akhir mengikuti persetujuan
            lembaga pembiayaan.
          </small>
        </aside>
      </main>
      <section className="container faq section">
        <div>
          <span className="eyebrow">Pertanyaan singkat</span>
          <h2>Yang sering ditanyakan</h2>
        </div>
        <div>
          {[
            [
              "Apakah hasil simulasi ini pasti?",
              "Belum. Ini adalah estimasi awal untuk membantu perencanaan.",
            ],
            ["Dokumen apa yang dibutuhkan?", "Umumnya KTP, KK, slip gaji, dan rekening koran."],
            ["Apakah DP bisa disesuaikan?", "Bisa, tergantung program dan hasil analisis kredit."],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <Cta
        title="Perlu bantuan menyusun cicilan?"
        text="Konsultasikan pilihan DP dan tenor yang paling nyaman untukmu."
        action={<WhatsAppButton label="Konsultasi Kredit" light />}
      />
    </>
  );
}

const promos = [
  {
    tag: "Kredit",
    title: "DP mulai 15%",
    text: "Bawa pulang mobil pilihan dengan uang muka lebih ringan.",
    period: "Berlaku s.d. 30 Juni 2026",
    accent: true,
  },
  {
    tag: "Purna jual",
    title: "Gratis servis berkala",
    text: "Perawatan rutin gratis untuk unit dan periode tertentu.",
    period: "Berlaku s.d. 31 Juli 2026",
  },
  {
    tag: "Cashback",
    title: "Cashback hingga Rp 8 juta",
    text: "Potongan tambahan untuk pembelian unit pilihan.",
    period: "Berlaku s.d. 30 Juni 2026",
  },
  {
    tag: "Perlindungan",
    title: "Gratis asuransi 1 tahun",
    text: "Berkendara lebih tenang dengan perlindungan menyeluruh.",
    period: "Berlaku s.d. 31 Mei 2026",
  },
];

function Promo() {
  return (
    <>
      <PageHeader
        eyebrow="Promo berjalan"
        title="Penawaran baik, keputusan lebih ringan."
        text="Lihat program terbaru dan tanyakan ketersediaannya pada sales kami."
      />
      <main className="container promo-grid">
        {promos.map((promo, i) => (
          <article className={promo.accent ? "accent" : ""} key={promo.title}>
            <div className="promo-top">
              <span>{promo.tag}</span>
              <b>0{i + 1}</b>
            </div>
            <div>
              <h2>{promo.title}</h2>
              <p>{promo.text}</p>
            </div>
            <div className="promo-period">
              <Icon name="clock" />
              <span>{promo.period}</span>
            </div>
          </article>
        ))}
      </main>
      <Cta
        title="Temukan mobil yang cocok dengan promonya."
        text="Jelajahi katalog dan bandingkan harga mulai dari setiap model."
        action={
          <button className="button button-light" onClick={() => go("katalog")}>
            Lihat Katalog <Icon name="arrow" />
          </button>
        }
      />
    </>
  );
}

function Kontak() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <>
      <PageHeader
        eyebrow="Kontak & lokasi"
        title="Mari bicarakan mobil yang kamu cari."
        text="Kunjungi showroom, hubungi WhatsApp, atau tinggalkan pesan."
      />
      <main className="container contact-layout">
        <section className="contact-info">
          <div className="location-card">
            <div className="map-art">
              <span className="road road-one" />
              <span className="road road-two" />
              <span className="map-pin">
                <Icon name="map" size={26} />
              </span>
            </div>
            <div>
              <span className="eyebrow">Showroom kami</span>
              <h2>Ruko Tiban BTN</h2>
              <p>Batam, Kepulauan Riau</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer">
                Buka di Google Maps <Icon name="arrow" />
              </a>
            </div>
          </div>
          <div className="contact-cards">
            <div>
              <span>
                <Icon name="message" />
              </span>
              <p>
                WhatsApp<strong>+62 812 3456 7890</strong>
              </p>
            </div>
            <div>
              <span>
                <Icon name="clock" />
              </span>
              <p>
                Jam buka<strong>Sen–Sab, 08.30–17.30</strong>
              </p>
            </div>
          </div>
        </section>
        <form className="contact-form" onSubmit={submit}>
          <div>
            <span>01</span>
            <h2>Tinggalkan pesan</h2>
          </div>
          <label>
            <span>Nama</span>
            <input required placeholder="Nama lengkap" />
          </label>
          <label>
            <span>Nomor WhatsApp</span>
            <input required type="tel" placeholder="08xx xxxx xxxx" />
          </label>
          <label>
            <span>Mobil yang diminati</span>
            <select required>
              <option value="">Pilih mobil</option>
              {cars.map((car) => (
                <option key={car.id}>{car.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Pesan</span>
            <textarea rows={4} placeholder="Ceritakan kebutuhanmu..." />
          </label>
          <button className="button button-accent" type="submit">
            {sent ? (
              <>
                <Icon name="check" /> Pesan Terkirim
              </>
            ) : (
              <>
                Kirim Pesan <Icon name="arrow" />
              </>
            )}
          </button>
          {sent && (
            <p className="success-note">
              Terima kasih. Tim kami akan menghubungi Anda melalui WhatsApp.
            </p>
          )}
        </form>
      </main>
    </>
  );
}

export default function App() {
  const parse = () => {
    const hash = window.location.hash.slice(1) || "home";
    const [rawPage, params] = hash.split("?");
    const page = (
      ["home", "katalog", "detail", "kredit", "promo", "kontak"].includes(rawPage)
        ? rawPage
        : "home"
    ) as Page;
    return { page, id: Number(new URLSearchParams(params).get("id")) || 1 };
  };
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const content = useMemo(() => {
    if (route.page === "katalog") return <Katalog />;
    if (route.page === "detail") return <Detail id={route.id} />;
    if (route.page === "kredit") return <Kredit />;
    if (route.page === "promo") return <Promo />;
    if (route.page === "kontak") return <Kontak />;
    return <Home />;
  }, [route]);
  return (
    <div>
      <Navigation page={route.page} />
      {content}
      <Footer />
    </div>
  );
}
