import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render((
    // 包裹App根组件，并绑定store
    <Provider store={store}>
        <App />
    </Provider>
))