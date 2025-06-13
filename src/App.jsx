import { Navbar } from './components'
import { CVTemplate, Home } from './pages'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CVPreview from './pages/CVPreview'
import CVTemplate1 from './pages/CVTemplate1'
import CVTemplate2 from './pages/CVTemplate2'

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
					<Route path='/cvtemplate1' element={<CVTemplate1></CVTemplate1>}></Route>
					<Route path='/cvtemplate2' element={<CVTemplate2></CVTemplate2>}></Route>
				</Routes>
			</Router>
		</>
	)
}

export default App
