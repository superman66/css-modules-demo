import React from 'react'
import ReactDOM from 'react-dom'
import styles from './style.css'
import Demo1 from './demo1'
import Demo2 from './demo2'
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>App.js</h2>
        <div className="global">这是global 的样式</div>
        <div className={styles.container}>这是局部的样式</div>
        <div className={styles.another}>这是继承其他css文件的样式规则</div>
        <Demo1 />
        <Demo2 />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
