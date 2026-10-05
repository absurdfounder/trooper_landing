import Footer from '@/components/ui/footer'
import Newsletter from '@/components/newsletter'
import RecentlyShippedSection from '@/components/RecentlyShippedSection'
import SectionShell from '@/components/ui/SectionShell'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* bg-canvas, not bg-gray-50: the `gray` override below 100 falls through
          to stock #f9fafb, a cool white. Outside the max-w-7xl rail that put
          ~100px of blue-tinted gutter either side of a warm #FAFAF8 page. */}
      <main className="grow bg-canvas">
        {children}
      </main>

      <SectionShell rhythm bgClass="bg-canvas">
        <RecentlyShippedSection />
      </SectionShell>

      <SectionShell bgClass="bg-canvas" noBorderBottom={false}>
        <Newsletter />
      </SectionShell>
      <Footer />
    </>
  )
}
