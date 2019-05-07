import React from 'react'
import './index.css'

const CSSModuleDemo1 = () => {
  return (
    <div>
      <h3>Demo2</h3>
      <div className="global">这里同样使用了global样式</div>

      <div styleName="name">这里使用了 babel-plugin-react-css-modules</div>
    </div>
  )
}

export default CSSModuleDemo1
