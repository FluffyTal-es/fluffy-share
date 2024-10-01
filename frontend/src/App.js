import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages
import UploadPage from './Components/Pages/UploadPage'
import UploadedImage from './Components/Pages/UploadedImagePage'
import FZF from './Components/Pages/404Page.js'
import { createTheme, ThemeProvider } from '@material-ui/core'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3fb59f'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/' exact component={UploadPage} />
          <Route path='/upload/:image_url' component={UploadedImage} />
          <Route component={FZF} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
