import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { Provider } from 'react-redux'
import store from './store'
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render((
    // 包裹App根组件，并绑定store
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
))