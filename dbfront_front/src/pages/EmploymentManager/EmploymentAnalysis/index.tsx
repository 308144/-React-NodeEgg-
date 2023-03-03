import React from 'react'
import One from './EchartData/one'
import Two from './EchartData/Two'
import Three from './EchartData/Three'
import Four from './EchartData/Four'
import styles from './index.module.less'
export default function EmploymentAnalysis() {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.first}>
          <div className={styles.firstChild}>
            <One />
          </div>
          <div className={styles.firstChildTwo}>
            <Three />
          </div>
        </div>
        <div className={styles.secord}>
          <div className={styles.firstChild}>
            <Two />
          </div>
          <div className={styles.firstChildTwo}>
            <Four />
          </div>
        </div>
      </div>
    </>
  )
}
