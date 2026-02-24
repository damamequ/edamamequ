import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
    const { signIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            await signIn(email, password)
        } catch (err) {
            setError(err.message === 'Invalid login credentials'
                ? 'Email atau password salah.'
                : err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-light)] px-6">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="size-14 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-[var(--color-accent-dark)] mb-4 shadow-lg shadow-[var(--color-primary)]/20">
                        <span className="material-symbols-outlined text-2xl font-bold">eco</span>
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight">EdamameQu</h1>
                    <p className="text-xs text-[var(--color-accent-dark)]/50 uppercase tracking-widest mt-1">Admin Panel</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="admin@edamamequ.com"
                            required
                            className="admin-input"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="admin-input"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                            <span className="material-symbols-outlined text-lg">error</span>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[var(--color-primary)] text-[var(--color-accent-dark)] font-bold rounded-xl shadow-lg shadow-[var(--color-primary)]/20 hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-lg">hourglass_empty</span>
                                Masuk...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">login</span>
                                Masuk
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Hanya untuk administrator EdamameQu.
                </p>
            </div>
        </div>
    )
}
