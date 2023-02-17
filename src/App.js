import { BrowserRouter, Routes, Route } from "react-router-dom"
import Movies from './routes/Movies'
import Movie from './routes/Movie'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} ></Route>
        <Route path="/movies/:id" element={<Movie />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App