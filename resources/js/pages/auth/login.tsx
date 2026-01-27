import { Form, Head } from '@inertiajs/react';
import { motion } from 'motion/react';
import { LogIn, Lock, Mail } from 'lucide-react';

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

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
}: LoginProps) {
    return (
        <AuthLayout
            title="Welcome back"
            description="Sign in to your admin account"
        >
            <Head title="Log in" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <motion.div 
                                    className="grid gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                >
                                    <Label htmlFor="email" className="text-white/70 text-sm font-medium flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-white/40" />
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className="bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder:text-white/30 transition-all duration-200 h-12"
                                    />
                                    <InputError message={errors.email} />
                                </motion.div>

                                <motion.div 
                                    className="grid gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-white/70 text-sm font-medium flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-white/40" />
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
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder:text-white/30 transition-all duration-200 h-12"
                                    />
                                    <InputError message={errors.password} />
                                </motion.div>

                                <motion.div 
                                    className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                    <Label htmlFor="remember" className="text-white/60 text-sm font-medium cursor-pointer">
                                        Remember me for 30 days
                                    </Label>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <Button
                                        type="submit"
                                        className="relative overflow-hidden group w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 shadow-lg shadow-blue-500/25 transition-all duration-300"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner />}
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <LogIn className="w-4 h-4" />
                                            Sign in
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                    </Button>
                                </motion.div>
                            </div>
                        </>
                    )}
                </Form>

                {status && (
                    <motion.div 
                        className="mt-6 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
                            <p className="text-sm font-medium text-emerald-400">
                                {status}
                            </p>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </AuthLayout>
    );
}