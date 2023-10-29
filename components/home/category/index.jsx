import React from 'react'
import styles from './styles.module.scss'
import { BsArrowDownCircle } from 'react-icons/bs'
import {useMediaQuery} from 'react-responsive'

export default function Category({header,products,background}) {
    const isMedium = useMediaQuery({ query: '(max-width: 1300px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 550px)' })
  return (
    <div className={styles.category} style={{background:`${background}`}}>
        <div className={styles.category__header}>
            <h1>{header}</h1>
            <BsArrowDownCircle/>
        </div>
        <div className={styles.category__products}>
            {products.slice(0 ,isMobile ? 4 : isMedium ? 4 : 6).map((product) => (
                <div className={styles.product}>
                     <img src={product.image} alt="" />
                </div>
            ))}
        </div>
    </div>
  )
}
