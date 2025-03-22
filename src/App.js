import './App.css';
import Homepage from './components/homepage/Homepage'
import Footer from './components/footer/Footer';
import NavigationBar from './components/navigationBar/NavigationBar'

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider>
          <NavigationBar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              {/* <Route path="/" element={< />} /> */}
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
