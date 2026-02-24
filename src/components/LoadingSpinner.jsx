export default function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-light)]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative size-16">
                    <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary)]/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-primary)] animate-spin"></div>
                </div>
                <p className="text-sm font-semibold text-[var(--color-accent-dark)]/60 tracking-wide">Memuat konten...</p>
            </div>
        </div>
    )
}
