import React from 'react'
import PubSub from 'pubsub-js'
import { useEffect } from 'react'
export default function Kun() {
  return (
      <div>
          <h3>Kun</h3>
          <button onClick={() => {
              PubSub.publish('kun', '鸡你太美');
          }}>发布消息</button>
      </div>
  )
}
