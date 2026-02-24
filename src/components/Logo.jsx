export default function Logo({ className = "size-8", innerClassName = "" }) {
    return (
        <div className={`${className} bg-[var(--color-primary)] rounded-xl flex items-center justify-center text-[var(--color-accent-dark)] overflow-hidden shadow-inner relative group transition-all duration-500 hover:rotate-6`}>
            {/* SVG Edamame Pod */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4/5 h-4/5 ${innerClassName} drop-shadow-sm`}
            >
                {/* Pod Body */}
                <path
                    d="M15,45 C30,15 70,15 85,45 C95,65 75,85 50,85 C25,85 5,65 15,45 Z"
                    fill="currentColor"
                />
                {/* Beans inside (subtle circles) */}
                <circle cx="35" cy="48" r="7" fill="black" fillOpacity="0.15" />
                <circle cx="50" cy="55" r="7" fill="black" fillOpacity="0.15" />
                <circle cx="65" cy="62" r="7" fill="black" fillOpacity="0.15" />

                {/* Shine effect */}
                <path
                    d="M25,40 C35,25 65,25 75,40"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeOpacity="0.3"
                />
            </svg>
        </div>
    )
}
