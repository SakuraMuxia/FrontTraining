import React from 'react'
import WithMemo from './components/WithMemo'
import WithoutMemo from './components/WithoutMemo'

export default function App() {
    return (
        <div>
            <h3>without memo</h3>
            <WithoutMemo />
            <h3>With memo</h3>
            <WithMemo />
        </div>
    )
}
