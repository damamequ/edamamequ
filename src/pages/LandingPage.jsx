import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Story from '../components/Story'
import Products from '../components/Products'
import Nutrition from '../components/Nutrition'
import Process from '../components/Process'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import { useSiteContent } from '../hooks/useSiteContent'

export default function LandingPage() {
    const { content, loading, error } = useSiteContent()

    if (loading) return <LoadingSpinner />

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-light)]">
                <div className="text-center p-8">
                    <span className="material-symbols-outlined text-5xl text-red-400 mb-4">error</span>
                    <h2 className="text-xl font-bold mb-2">Terjadi Kesalahan</h2>
                    <p className="text-[var(--color-accent-dark)]/60 text-sm">{error}</p>
                </div>
            </div>
        )
    }

    const theme = content.theme || defaultContent.theme

    return (
        <div style={{
            '--color-primary': theme.primary,
            '--color-background-light': theme.backgroundLight,
            '--color-background-dark': theme.backgroundDark,
            '--color-accent-dark': theme.accentDark,
        }}>
            <Navbar data={content.navbar} />
            <main>
                <Hero data={content.hero} />
                <Story data={content.story} />
                <Products data={content.products} />
                <Nutrition data={content.nutrition} />
                <Process data={content.process} />
                <Gallery data={content.gallery} />
                <Contact data={content.contact} />
                <Footer data={content.footer} />
            </main>
        </div>
    )
}
