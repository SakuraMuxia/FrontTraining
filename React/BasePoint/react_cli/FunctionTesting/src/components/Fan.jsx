import React, { useState } from 'react'
import PubSub from 'pubsub-js'

export default function Fan() {
    let [song, setSong] = useState("大碗宽面")
    
    return (
        <div>
            <h3>Fan</h3>
            <button onClick={() => {
                PubSub.publish('fan', song);
            }}>发布消息</button>
        </div>
    )
}
