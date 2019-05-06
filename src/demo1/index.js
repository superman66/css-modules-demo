import React from 'react'
import styles from './index.css'

const CSSModuleDemo1 = () => {
  return (
    <div>
      <h3>Demo1</h3>
      <div className="global">这里同样使用了global样式</div>

      <div className={styles.name}>这是另外一个局部样式</div>
    </div>
  )
}

export default CSSModuleDemo1
