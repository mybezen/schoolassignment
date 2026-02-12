import { Head, Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Head title="404 - Page Not Found" />

      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-950 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animasi angka 404 */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-8xl sm:text-9xl md:text-[12rem] font-black tracking-tighter bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent mb-4"
          >
            404
          </motion.div>

          {/* Judul */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Halaman Tidak Ditemukan
          </motion.h1>

          {/* Deskripsi */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-xl mx-auto"
          >
            Maaf, halaman yang kamu cari sepertinya tidak ada atau telah dipindahkan.
            Mungkin ada kesalahan ketik di URL atau halaman sudah dihapus.
          </motion.p>

          {/* Tombol aksi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300"
            >
              <Home className="h-5 w-5" />
              Kembali ke Beranda
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-8 py-4 bg-zinc-800/80 text-zinc-300 border border-zinc-700 font-medium rounded-xl hover:bg-zinc-700/80 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              Kembali ke Halaman Sebelumnya
            </button>
          </motion.div>

          {/* Elemen dekoratif / easter egg kecil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="mt-16 text-zinc-600 text-sm"
          >
            <p>ByteCraft masih mencari halaman itu...</p>
            <p className="mt-2 opacity-70">Error 404: Halaman kabur sebelum kami sempat coding</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}