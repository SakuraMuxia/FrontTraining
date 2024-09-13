import React from 'react'
import PropTypes from 'prop-types'
function Child({ name, age }) {
  return (
    <div>
          <h4>函数组件</h4>
          <p>props name: {name}</p>
          <p>props age: {age}</p>
    </div>
  )
}
// 通过给函数对象设置propTypes属性的方式设置类型
Child.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number
}
// 通过给函数对象设置defaultProps属性的方式设置默认值
Child.defaultProps = {
    age: 10000
}
export default Child