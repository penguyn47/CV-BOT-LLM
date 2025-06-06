import { Navbar } from './components'
import { CVTemplate, Home } from './pages'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CVPreview from './pages/CVPreview'

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
				</Routes>
			</Router>
		</>
	)
}

export default App
