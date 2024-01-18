import Header from './header'
import Footer from './footer'
import Head from 'next/head';


export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Only Blog</title>
                <link rel="icon" href="/images/logo.ico" />
                <meta
                name="lx blog"
                content="This is a blog"
                />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
            <style>{`
            *{
                margin: 0;
                padding: 0;
            }
            `}</style>            
        </>
    )
}