
// imports work with our fornt end
//require does not
// nodes != javascript
//backendjs is a little different from frontend js


import Head from 'next/head'
import styles from '../styles/Home.module.css'
//import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import LotteryEntrance from '../components/LotteryEntrance'

export default function Home() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Smart Contract Lottery</title>
          <meta name="description" content="Our Smart contract"/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        < LotteryEntrance />
        {/*<ManualHeader /> */}
        {/* header / connect/nav bar */}


      </div>
    )
}
