import { Form, Head } from '@inertiajs/react';
import { motion } from 'framer-motion'; // pastikan import dari 'framer-motion' (bukan motion/react)
import { LogIn, Lock, Mail, Eye, EyeOff } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1 + 0.2, duration: 0.5 },
    }),
};

export default function Login({
    status,
    canResetPassword,
}: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout
            title="Welcome back"
            description="Sign in to your admin account"
        >
            <Head title="Log in" />

            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-black/80 backdrop-blur-xl shadow-2xl shadow-blue-900/20 p-8 md:p-10">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none" />

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6 relative z-10"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-6">
                                    {/* Email Field */}
                                    <motion.div 
                                        custom={0}
                                        variants={fieldVariants}
                                        className="space-y-2"
                                    >
                                        <Label 
                                            htmlFor="email" 
                                            className="text-white/80 text-sm font-medium flex items-center gap-2"
                                        >
                                            <Mail className="w-4 h-4 text-blue-400/70" />
                                            Email address
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 
                                                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-white/10 
                                                           transition-all duration-300 rounded-xl"
                                            />
                                        </div>
                                        <InputError message={errors.email} className="text-red-400 text-xs" />
                                    </motion.div>

                                    {/* Password Field */}
                                    <motion.div 
                                        custom={1}
                                        variants={fieldVariants}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <Label 
                                                htmlFor="password" 
                                                className="text-white/80 text-sm font-medium flex items-center gap-2"
                                            >
                                                <Lock className="w-4 h-4 text-blue-400/70" />
                                                Password
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                                    tabIndex={5}
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 
                                                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-white/10 
                                                           transition-all duration-300 rounded-xl pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} className="text-red-400 text-xs" />
                                    </motion.div>

                                    {/* Remember Me */}
                                    <motion.div 
                                        custom={2}
                                        variants={fieldVariants}
                                        className="flex items-center gap-3 bg-white/[0.03] border border-white/10 p-4 rounded-xl"
                                    >
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="border-blue-500/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 
                                                       focus:ring-blue-500/30"
                                        />
                                        <Label htmlFor="remember" className="text-white/70 text-sm font-medium cursor-pointer">
                                            Remember me for 30 days
                                        </Label>
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.div
                                        custom={3}
                                        variants={fieldVariants}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="relative w-full h-12 overflow-hidden group rounded-xl 
                                                       bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-purple-600 
                                                       shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 
                                                       transition-all duration-300 border-0"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing && <Spinner className="absolute left-4" />}
                                            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                                                <LogIn className="w-4 h-4" />
                                                Sign in
                                            </span>
                                            {/* Shine effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                                            -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                        </Button>
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </Form>

                    {status && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-6"
                        >
                            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                                <p className="text-sm font-medium text-emerald-400">
                                    {status}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AuthLayout>
    );
}