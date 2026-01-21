import HomePage from '../components/HomePage'
import About from '../components/About'
import Reviews from '../components/Reviews'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import Disclaimer from '../components/Disclaimer'
import LazySection from '../pages/LazySection'

export default function AllPublicPages() {
  return (
    <>
      <HomePage/>
      <LazySection><About/></LazySection>
      <LazySection><Reviews/></LazySection>
      <LazySection><Services/></LazySection>
      <LazySection><HowItWorks/></LazySection>
      <LazySection><Disclaimer/></LazySection>
    </>
  )
}
