import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import OurValues from './pages/OurValues.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Industries from './pages/Industries.jsx'
import ScheduleDemo from './pages/ScheduleDemo.jsx'
import ServicesIndex from './pages/ServicesIndex.jsx'
import ProductsIndex from './pages/ProductsIndex.jsx'
import DeaLookupTool from './pages/products/DeaLookupTool.jsx'
import DeaComplianceReporting from './pages/products/DeaComplianceReporting.jsx'
import CsInventory from './pages/products/CsInventory.jsx'
import LtcAnalytics from './pages/products/LtcAnalytics.jsx'
import PointclickcareFeed from './pages/products/PointclickcareFeed.jsx'
import DocumentAutomation from './pages/products/DocumentAutomation.jsx'
import AIAutomation from './pages/services/AIAutomation.jsx'
import CustomDevelopment from './pages/services/CustomDevelopment.jsx'
import DataAnalytics from './pages/services/DataAnalytics.jsx'
import LTCPharmacyIT from './pages/services/LTCPharmacyIT.jsx'
import MicrosoftCloud from './pages/services/MicrosoftCloud.jsx'
import PointClickCare from './pages/services/PointClickCare.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <style>{`
@font-face {
  font-family: 'Gotham';
  src: url('/fonts/Gotham-Book.woff2') format('woff2'),
       url('/fonts/Gotham-Book.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Gotham';
  src: url('/fonts/Gotham-Light.woff2') format('woff2'),
       url('/fonts/Gotham-Light.woff') format('woff');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #C6DBE7;
  color: #1E3A5C;
  font-family: 'Gotham', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
@keyframes dropIn { from { opacity: 0; transform: translateX(-50%) translateY(-6px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #C6DBE7; }
::-webkit-scrollbar-thumb { background: #8AB8E3; border-radius: 3px; }
      `}</style>

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-values" element={<OurValues />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/schedule-demo" element={<ScheduleDemo />} />
        <Route path="/services" element={<ServicesIndex />} />
        <Route path="/products" element={<ProductsIndex />} />
        <Route path="/products/dea-lookup" element={<DeaLookupTool />} />
        <Route path="/products/dea-compliance-reporting" element={<DeaComplianceReporting />} />
        <Route path="/products/cs-inventory" element={<CsInventory />} />
        <Route path="/products/ltc-analytics" element={<LtcAnalytics />} />
        <Route path="/products/pointclickcare-feed" element={<PointclickcareFeed />} />
        <Route path="/products/document-automation" element={<DocumentAutomation />} />
        <Route path="/services/ai-automation" element={<AIAutomation />} />
        <Route path="/services/custom-development" element={<CustomDevelopment />} />
        <Route path="/services/data-analytics" element={<DataAnalytics />} />
        <Route path="/services/ltc-pharmacy-it" element={<LTCPharmacyIT />} />
        <Route path="/services/microsoft-cloud" element={<MicrosoftCloud />} />
        <Route path="/services/pointclickcare-integration" element={<PointClickCare />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
