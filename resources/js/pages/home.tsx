import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowRight, Target, Users, Award, TrendingUp, Sparkles, Code2 } from 'lucide-react';
import { format } from 'date-fns';
import { motion, Variants, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  DragOverlay,
  pointerWithin,
  useDroppable,
  DragOverEvent,
  ClientRect,
} from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  snapCenterToCursor,
  restrictToHorizontalAxis,
} from "@dnd-kit/modifiers";


interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  price: string | null;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail: string | null;
  published_at: string;
}

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  start_date: string;
  location: string | null;
}

interface Client {
  id: number | string;
  name: string;
  logo: string;
  website?: string;
}

interface ClientMarqueeProps {
  clients: Client[];
  speed?: number;       // px per detik (default 50 → lambat-sedang)
  pauseOnHover?: boolean;
  className: string;
}

interface HomeProps {
  featuredProducts: Product[];
  latestArticles: Article[];
  upcomingEvents: Event[];
  clients: Client[];
}

const pageEntranceVariants: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.4, when: "beforeChildren" }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    }
  }
};

const heroItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
    scale: 0.96
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const logoVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

function EntranceLogo() {
  return (
    <motion.div
      variants={logoVariants}
      className="flex flex-col items-center gap-4 mb-16"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-violet-600/30 blur-2xl opacity-70" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-2xl shadow-violet-700/40">
          <Code2 className="h-10 w-10 text-white" strokeWidth={2} />
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white">ByteCraft</h2>
        <p className="text-lg text-zinc-400 mt-1">Software Development</p>
      </div>
    </motion.div>
  );
}

function AboutSection() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver innovative solutions that drive business growth and create lasting value for our clients.',
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'A diverse group of talented professionals dedicated to excellence and customer satisfaction.',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'We maintain the highest standards in everything we do, ensuring exceptional results every time.',
    },
    {
      icon: TrendingUp,
      title: 'Growth Focus',
      description: 'Committed to continuous improvement and innovation to stay ahead in the industry.',
    },
  ];

  return (
    <motion.section initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionRevealVariants}
      className="relative py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[1px] w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={childVariants}
        className="space-y-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={childVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            About Us
          </motion.div>
          <motion.h2 variants={childVariants} className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Building the Future
          </motion.h2>
          <motion.p variants={childVariants} className="text-lg leading-relaxed text-zinc-400">
            Founded with a vision to transform the industry, we've grown from a small startup to a leading provider of innovative solutions. We believe in the power of technology and human creativity to solve complex challenges.
          </motion.p>
        </div>

        <motion.div
          variants={childVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={childVariants}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/0 via-violet-600/5 to-purple-600/0 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mb-4 inline-flex rounded-xl border border-white/5 bg-white/5 p-3">
                  <Icon className="h-6 w-6 text-violet-400" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={heroItemVariants}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-12 backdrop-blur-xl"
        >
          <div className="absolute right-0 top-0 h-64 w-64 bg-violet-600/10 blur-[128px]" />
          <div className="relative grid gap-12 text-center sm:grid-cols-4">
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '500+', label: 'Projects Completed' },
              { value: '200+', label: 'Happy Clients' },
              { value: '50+', label: 'Team Members' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <p className="mb-2 bg-gradient-to-br from-white to-white/60 bg-clip-text text-5xl font-bold text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 80, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function Home({ featuredProducts, latestArticles, upcomingEvents, clients }: HomeProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PublicLayout>
      <Head title="Home" />

      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="entrance"
            variants={pageEntranceVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroContainerVariants}
              className="text-center px-6"
            >
              <EntranceLogo />

              <motion.h1
                variants={heroItemVariants}
                className="mt-8 bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl"
              >
                Welcome to the Future
              </motion.h1>

              <motion.p
                variants={heroItemVariants}
                className="mt-6 text-xl text-zinc-400 max-w-xl mx-auto"
              >
                Preparing something extraordinary...
              </motion.p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            variants={pageEntranceVariants}
            initial="initial"
            animate="enter"
            className="relative"
          >
            {/* Hero Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionRevealVariants}
              className="relative min-h-[90vh] flex items-center justify-center pt-20"
            >
              <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 blur-[128px]" />

              <motion.div
                variants={childVariants}
                className="relative mx-auto max-w-5xl text-center px-6"
              >
                <motion.div
                  variants={childVariants}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500"></span>
                  </span>
                  Welcome to ByteCraft
                </motion.div>

                <motion.h1
                  variants={childVariants}
                  className="mb-8 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-7xl font-bold leading-[1.1] tracking-tight text-transparent sm:text-8xl"
                >
                  Building Excellence
                  <br />
                  Through Innovation
                </motion.h1>

                <motion.p
                  variants={childVariants}
                  className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-zinc-400"
                >
                  We create innovative solutions that empower businesses to achieve their full potential through cutting-edge technology and exceptional design.
                </motion.p>

                <motion.div
                  variants={childVariants}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Link
                    href="/products"
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40"
                  >
                    Explore Products
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
                  >
                    Contact Us
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                variants={childVariants}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-zinc-500">Scroll to explore</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-12 w-6 rounded-full border border-white/10 p-1"
                  >
                    <div className="h-2 w-full rounded-full bg-gradient-to-b from-violet-500 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>

            <AboutSection />

            {/* History / Company Profile Section */}
            <section className="relative py-24 md:py-32">
              {/* Subtle background accents */}
              <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute left-1/3 top-1/4 h-96 w-96 bg-violet-600/8 rounded-full blur-3xl" />
                <div className="absolute right-1/4 bottom-1/3 h-80 w-80 bg-purple-600/8 rounded-full blur-3xl" />
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={heroContainerVariants}
                className="relative mx-auto max-w-6xl px-6"
              >
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                  <motion.div variants={heroItemVariants} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-zinc-400 backdrop-blur-xl">
                    <Sparkles className="h-4 w-4 text-violet-400" />
                    Our Journey
                  </motion.div>

                  <motion.h2 variants={heroItemVariants} className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                    ByteCraft History
                  </motion.h2>

                  <motion.p variants={heroItemVariants} className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    From a small startup to a trusted technology partner
                  </motion.p>
                </div>

                {/* Timeline */}
                <div className="relative">
                  {/* Vertical line (desktop only) */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent hidden md:block" />

                  <div className="space-y-16 md:space-y-24">
                    {[
                      {
                        year: "2018",
                        title: "The Beginning",
                        description:
                          "ByteCraft was born from the passion of a group of young developers who wanted to create simple yet impactful technology solutions for local businesses.",
                        side: "left",
                      },
                      {
                        year: "2020",
                        title: "Digital Transformation",
                        description:
                          "The pandemic became a catalyst. We helped dozens of SMEs and businesses adapt with fast and reliable websites, management systems, and digital tools.",
                        side: "right",
                      },
                      {
                        year: "2022",
                        title: "Expansion & Specialization",
                        description:
                          "The team grew significantly. We began focusing on premium services: web & mobile apps, modern UI/UX, cloud solutions, and integration of cutting-edge technologies.",
                        side: "left",
                      },
                      {
                        year: "2024 – Present",
                        title: "Continuous Innovation",
                        description:
                          "Today, ByteCraft continues to innovate with Next.js, Laravel, TypeScript, AI tools, and scalable architecture — ready to support businesses toward a digital future.",
                        side: "right",
                      },
                    ].map((milestone, index) => (
                      <motion.div
                        key={milestone.year}
                        variants={heroItemVariants}
                        className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${milestone.side === "right" ? "md:flex-row-reverse" : ""
                          }`}
                      >
                        {/* Year circle */}
                        <div className="relative z-10 flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full border-4 border-violet-600/50 bg-zinc-950/70 backdrop-blur-sm text-xl md:text-2xl font-bold text-violet-300 shadow-lg shadow-violet-900/20">
                          {milestone.year}
                        </div>

                        {/* Content card */}
                        <div className="flex-1 rounded-2xl border border-white/8 bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl transition-all hover:border-violet-500/30 hover:bg-white/[0.05]">
                          <h3 className="mb-3 text-xl md:text-2xl font-semibold text-white">{milestone.title}</h3>
                          <p className="text-base text-zinc-300 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Closing statement */}
                <motion.div
                  variants={heroItemVariants}
                  className="mt-16 md:mt-20 text-center"
                >
                  <p className="text-lg md:text-xl text-zinc-300">
                    Today, ByteCraft remains committed: <br />
                    <span className="font-medium text-violet-400">
                      Building technology that's easy to use, yet delivers real impact.
                    </span>
                  </p>
                </motion.div>
              </motion.div>
            </section>

            {featuredProducts.length > 0 && (
              <section className="py-32">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={heroContainerVariants}
                >
                  <div className="mb-16 flex items-end justify-between px-6">
                    <div>
                      <motion.div variants={heroItemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        Products
                      </motion.div>
                      <motion.h2 variants={heroItemVariants} className="text-5xl font-bold tracking-tight text-white">
                        Featured Solutions
                      </motion.h2>
                      <motion.p variants={heroItemVariants} className="mt-4 text-lg text-zinc-400">
                        Discover our latest offerings
                      </motion.p>
                    </div>
                    <motion.div variants={heroItemVariants}>
                      <Link
                        href="/products"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                      >
                        View All
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={heroContainerVariants}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6"
                  >
                    {featuredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={heroItemVariants}
                        whileHover={{ y: -8 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
                      >
                        <div className="aspect-video overflow-hidden">
                          {product.image ? (
                            <img
                              src={`/storage/${product.image}`}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="mb-2 text-xl font-semibold text-white">{product.name}</h3>
                          {product.description && (
                            <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                              {product.description}
                            </p>
                          )}
                          {product.price && (
                            <p className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white">
                              ${product.price}
                            </p>
                          )}
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                          >
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </section>
            )}

            {latestArticles.length > 0 && (
              <section className="py-32">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={heroContainerVariants}
                >
                  <div className="mb-16 flex items-end justify-between px-6">
                    <div>
                      <motion.div variants={heroItemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        Insights
                      </motion.div>
                      <motion.h2 variants={heroItemVariants} className="text-5xl font-bold tracking-tight text-white">
                        Latest Articles
                      </motion.h2>
                      <motion.p variants={heroItemVariants} className="mt-4 text-lg text-zinc-400">
                        Stay updated with our insights
                      </motion.p>
                    </div>
                    <motion.div variants={heroItemVariants}>
                      <Link
                        href="/articles"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                      >
                        View All
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={heroContainerVariants}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6"
                  >
                    {latestArticles.map((article) => (
                      <motion.div
                        key={article.id}
                        variants={heroItemVariants}
                        whileHover={{ y: -8 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
                      >
                        <div className="aspect-video overflow-hidden">
                          {article.thumbnail ? (
                            <img
                              src={`/storage/${article.thumbnail}`}
                              alt={article.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                          )}
                        </div>
                        <div className="p-6">
                          <p className="mb-2 text-xs font-medium text-violet-400">
                            {format(new Date(article.published_at), 'MMMM dd, yyyy')}
                          </p>
                          <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{article.title}</h3>
                          {article.excerpt && (
                            <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                              {article.excerpt}
                            </p>
                          )}
                          <Link
                            href={`/articles/${article.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                          >
                            Read More
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </section>
            )}

            {upcomingEvents.length > 0 && (
              <section className="py-32">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={heroContainerVariants}
                >
                  <div className="mb-16 flex items-end justify-between px-6">
                    <div>
                      <motion.div variants={heroItemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        Events
                      </motion.div>
                      <motion.h2 variants={heroItemVariants} className="text-5xl font-bold tracking-tight text-white">
                        Upcoming Events
                      </motion.h2>
                      <motion.p variants={heroItemVariants} className="mt-4 text-lg text-zinc-400">
                        Join us at our upcoming events
                      </motion.p>
                    </div>
                    <motion.div variants={heroItemVariants}>
                      <Link
                        href="/events"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                      >
                        View All
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={heroContainerVariants}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6"
                  >
                    {upcomingEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        variants={heroItemVariants}
                        whileHover={{ y: -8 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
                      >
                        <div className="aspect-video overflow-hidden">
                          {event.image ? (
                            <img
                              src={`/storage/${event.image}`}
                              alt={event.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                          )}
                        </div>
                        <div className="p-6">
                          <p className="mb-2 text-xs font-medium text-violet-400">
                            {format(new Date(event.start_date), 'MMMM dd, yyyy')}
                          </p>
                          <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{event.title}</h3>
                          {event.location && (
                            <p className="mb-4 flex items-center gap-2 text-sm text-zinc-400">
                              <span className="text-violet-500">→</span>
                              {event.location}
                            </p>
                          )}
                          <Link
                            href={`/events/${event.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                          >
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </section>
            )}

            {clients.length > 0 && (
              <section className="py-40 md:py-48 min-h-[60vh] flex flex-col justify-center relative overflow-hidden">
                {/* Optional background accent */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-900/5 to-transparent pointer-events-none overflow-hidden" />

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={heroContainerVariants}
                  className="text-center px-6"
                >
                  <motion.div variants={heroItemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-zinc-400 backdrop-blur-xl">
                    Our Clients
                  </motion.div>
                  <motion.h2 variants={heroItemVariants} className="mb-6 text-5xl md:text-6xl font-bold tracking-tight text-white">
                    Trusted By Leading Organizations
                  </motion.h2>
                  <motion.p variants={heroItemVariants} className="mb-16 text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
                    Building lasting partnerships with industry leaders
                  </motion.p>

                  {/* ClientMarquee dengan fix scroll & tinggi */}
                  <ClientMarquee
                    className="overflow-hidden"
                    clients={clients}
                    speed={45}
                    pauseOnHover={true}
                  />
                </motion.div>
              </section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}

const getInsertionPosition = (event: DragOverEvent, rect: ClientRect) => {
  const activatorEvent = event.activatorEvent as PointerEvent | MouseEvent;
  const cursorX = activatorEvent.clientX;
  const itemCenterX = rect.left + rect.width / 2;
  return cursorX < itemCenterX ? "before" : "after";
};

function SortableClientItem({ client, isOver, insertionPos }: {
  client: Client;
  isOver?: boolean;
  insertionPos?: "before" | "after" | null;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: client.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 0.25s ease",
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 30 : "auto",
    width: "fit-content",
    minWidth: "120px", // minimal lebih besar biar tinggi terasa balance
  };

  return (
    <>
      {/* Drop bar SEBELUM item */}
      {isOver && insertionPos === "before" && (
        <div className="absolute left-[-24px] sm:left-[-32px] top-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-28 sm:h-36 md:h-40 rounded-full bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500 opacity-90 animate-pulse scale-110 transition-all duration-200 shadow-lg shadow-violet-600/40 z-40 pointer-events-none" />
      )}

      <motion.a
        ref={setNodeRef}
        style={style}
        href={client.website}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex flex-col items-center justify-center touch-none select-none ${isOver ? "scale-[1.08] shadow-2xl shadow-violet-500/40 ring-2 ring-violet-400/50" : ""}`}
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...attributes}
        {...listeners}
      >
        {/* Logo container lebih tinggi */}
        <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 md:p-8 backdrop-blur-xl transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <img
            src={`/storage/${client.logo}`}
            alt={client.name}
            className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto max-w-[160px] md:max-w-[180px] object-contain opacity-60 grayscale transition-all duration-400 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>

        {/* Nama client lebih bawah */}
        <motion.div
          className="absolute bottom-[-4rem] sm:bottom-[-4.5rem] md:bottom-[-5rem] left-1/2 -translate-x-1/2 pointer-events-none z-10"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          whileHover={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 420, damping: 28 },
          }}
        >
          <motion.span className="block rounded-lg bg-black/75 px-4 py-2 text-sm md:text-base font-medium text-white/95 backdrop-blur-lg border border-white/15 shadow-2xl whitespace-nowrap">
            {client.name}
          </motion.span>
        </motion.div>
      </motion.a>

      {/* Drop bar SETELAH item */}
      {isOver && insertionPos === "after" && (
        <div className="absolute right-[-24px] sm:right-[-32px] top-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-28 sm:h-36 md:h-40 rounded-full bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500 opacity-90 animate-pulse scale-110 transition-all duration-200 shadow-lg shadow-violet-600/40 z-40 pointer-events-none" />
      )}
    </>
  );
}

function ClientMarquee({
  clients: initialClients,
  speed = 45,
  pauseOnHover = true,
}: ClientMarqueeProps) {
  const [clients, setClients] = useState(initialClients);
  const [activeId, setActiveId] = useState<number | string | null>(null);
  const [overId, setOverId] = useState<number | string | null>(null);
  const [insertionPos, setInsertionPos] = useState<"before" | "after" | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setOverId(null);
      setInsertionPos(null);
      return;
    }

    setOverId(over.id as string | number);

    const overRect = over.rect;
    if (overRect) {
      const activatorEvent = event.activatorEvent as PointerEvent | MouseEvent;
      const cursorX = activatorEvent.clientX;
      const centerX = overRect.left + overRect.width / 2;
      setInsertionPos(cursorX < centerX ? "before" : "after");
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      setClients((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const adjustedIndex = insertionPos === "before" ? newIndex : newIndex + 1;
        return arrayMove(items, oldIndex, adjustedIndex);
      });
    }

    setActiveId(null);
    setOverId(null);
    setInsertionPos(null);
    setIsHovered(false);
  };

  // Hitung apakah perlu scrollable (opsional, biar di mobile tidak ada scroll kosong kalau item sedikit)
  const needsScroll = clients.length > 4; // adjust angka ini sesuai jumlah item yang muat di viewport

  return (
    <div className="relative">
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        modifiers={[restrictToHorizontalAxis]}
        onDragOver={handleDragOver}
        onDragStart={(e) => {
          setActiveId(e.active.id);
          setIsHovered(true);
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActiveId(null);
          setOverId(null);
          setInsertionPos(null);
          setIsHovered(false);
        }}
      >
        <SortableContext
          items={clients.map((c) => c.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div
            className={`flex items-center gap-6 sm:gap-10 md:gap-14 lg:gap-20 whitespace-nowrap px-4 sm:px-8 md:px-12 lg:px-16 ${needsScroll ? "overflow-x-auto pb-10 md:pb-12 scrollbar-hide touch-pan-x snap-x snap-mandatory" : "justify-center"
              }`}
          >
            {clients.map((client) => (
              <SortableClientItem
                key={client.id}
                client={client}
                isOver={overId === client.id}
                insertionPos={overId === client.id ? insertionPos : null}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay
          modifiers={[snapCenterToCursor]}
          dropAnimation={{
            duration: 500,
            easing: "cubic-bezier(0.34, 1.56, 0.64, 1.35)",
          }}
        >
          {activeId ? (
            <div className="rounded-3xl border border-violet-400/50 bg-white/[0.06] p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-violet-700/50 ring-2 ring-violet-400/40">
              <img
                src={`/storage/${clients.find((c) => c.id === activeId)?.logo}`}
                alt={clients.find((c) => c.id === activeId)?.name}
                className="h-16 md:h-20 w-auto max-w-[180px] md:max-w-[220px] object-contain opacity-95"
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}