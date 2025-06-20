import { Navbar } from './components'
import { CVTemplate, Home } from './pages'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CVPreview from './pages/CVPreview'
import Template1 from './pages/Template1'
import Template2 from './pages/Template2'
import CVTemplate1 from './pages/CVTemplate1'
import CVTemplate2 from './pages/CVTemplate2'
import CVInfo from './pages/CVInfo'
import MyCVPage from './pages/MyCV'
import MyRecentCVPage from './pages/RecentCV'
import MyProfilePage from './pages/MyProfile'
import CVEditor from './pages/cv-editor'
import CVTemplate5 from './pages/CVTemplate5'

function App() {
	return (
		<>
			<Router>
				{/* HEADER - SECTION */}
				<Navbar />

				{/* BODY - SECTION */}
				<Routes>
					<Route path="/" element={<Home></Home>}></Route>
					<Route path="/cvtemplate" element={<CVTemplate></CVTemplate>}></Route>
					<Route path="/cvpreview" element={<CVPreview></CVPreview>}></Route>
					<Route path="/template1" element={<Template1></Template1>}></Route>
					<Route path="/template2" element={<Template2></Template2>}></Route>
					<Route path="/cvtemplate1" element={<CVTemplate1></CVTemplate1>}></Route>
					<Route path="/cvtemplate2" element={<CVTemplate2></CVTemplate2>}></Route>
					<Route path="/cvinfo" element={<CVInfo></CVInfo>}></Route>
					<Route path="/cveditor" element={<CVEditor></CVEditor>}></Route>
					<Route path="/mycv" element={<MyCVPage></MyCVPage>}></Route>
					<Route path="/recentcv" element={<MyRecentCVPage></MyRecentCVPage>}></Route>
					<Route path="/myprofile" element={<MyProfilePage></MyProfilePage>}></Route>
					<Route path="/cvtemplate5" element={<CVTemplate5></CVTemplate5>}></Route>
				</Routes>
			</Router>
		</>
	)
}

export default App
