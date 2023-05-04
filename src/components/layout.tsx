import Navbar from '@/components/navbar'
import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from "@/components/footer";

type LayoutProps = {
	children: ReactNode
	className?: string
}

const Layout = ({children, className}: LayoutProps) => {
	return (
		<div className={className}>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='description' content='' />
				<meta name='keywords' content='' />
				<meta name='author' content='GeekOn' />
				<meta
					name='viewport'
					content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
				/>
				<meta httpEquiv='X-UA-Compatible' content='ie=edge' />
				<meta name='robots' content='index, follow' />
				<meta name='theme-color' content='#1A1A1A' />
				{/* OG META */}
				<meta property='og:locale' content='ru_ru' />
				<meta property='og:title' content='BORN UZBEK' />
				<meta property='og:type' content='website' />
				<meta property='og:description' content='' />
				<meta property='og:url' content='https://bornuzbek.uz' />
				<meta property='og:image' content='/logo.svg' />
				{/* TWITTER META */}
				<meta name='twitter:card' content='summary' />
				<meta name='twitter:site' content='@bornuzbek' />
				<meta name='twitter:title' content='BORN UZBEK' />
				<meta name='twitter:creator' content='@geekon' />
				{/* LINKS */}
				<link rel='canonical' href='' />
				<link rel='icon' type='image/x-icon' href='/favicon.ico' />
				<title>BORN UZBEK</title>
			</Head>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
