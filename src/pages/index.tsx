import HeadphoneStrikedIcon from '@/assets/icons/headphone-striked.svg'
import HeadphoneIcon from '@/assets/icons/headphone.svg'
import LinkIcon from '@/assets/icons/link.svg'
import StarIcon from '@/assets/icons/star.svg'
import Layout from '@/components/layout'
import getStaticData, { JSONData } from '@/pages/api/staticdata'
import classes from '@/styles/index.module.scss'
import { GetStaticProps } from 'next'
import { Unbounded } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import { Fragment, useRef, useState } from 'react'

const FuturaPTFont = localFont({
	src: [
		{
			path: '../assets/fonts/FuturaPT-Book.woff',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../assets/fonts/FuturaPT-Demi.woff',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../assets/fonts/FuturaPT-Medium.woff',
			weight: '450',
			style: 'normal'
		}
	]
})

const unbounded = Unbounded({
	subsets: ['cyrillic'],
	weight: ['400', '600', '700'],
	style: 'normal'
})

const quotes: string[] = [
	'Birinchi bo’l',
	'Gap bilguncha, ish bil',
	'Время первых',
	'Men o’zbekman',
	'Born in Uzbekistan',
	'Я думаю в черном цвете',
	'Born Uzbek'
]

const HomePage = ({data}: { data: JSONData }) => {
	const [muted, setMuted] = useState<boolean>(true)
	const [selectedCategory, setSelectedCategory] = useState<string>('men')

	const videoRef = useRef<HTMLVideoElement>(null)

	const handleMute = () => {
		if (!videoRef.current) {
			return
		}

		if (videoRef.current.muted) {
			setMuted(false)
			videoRef.current.muted = false
		} else {
			setMuted(true)
			videoRef.current.muted = true
		}
	}

	return (
		<Layout className={FuturaPTFont.className}>
			<section className={classes.main}>
				<video
					autoPlay
					muted
					loop
					disablePictureInPicture
					aria-disabled
					disableRemotePlayback
					poster='/main-bg-preview.jpg'
					preload='true'
					controls={false}
					playsInline
					ref={videoRef}
				>
					<source src='/main-bg.webm' type='video/webm' />
					<source src='/main-bg.mp4' type='video/mp4' />
				</video>
				<div className={classes.roller}>
					<ul>
						{[...quotes, ...quotes, ...quotes, ...quotes].map((quote, i) => (
							<Fragment key={i}>
								<li>
									{quote}
								</li>
								<li>
									•
								</li>
							</Fragment>
						))}
					</ul>
				</div>
				<button className={classes.sound} onClick={handleMute}>{muted ? <HeadphoneIcon /> : <HeadphoneStrikedIcon />}</button>
			</section>
			<section className={classes.products} id='products'>
				<div role='tablist' className={classes.categories}>
					{data.categories.map((category) => (
						<div
							role='tab'
							data-active={category.key === selectedCategory}
							key={category.key}
							className={classes.category}
							tabIndex={0}
							onClick={() => {
								setSelectedCategory(category.key)
							}}
						>
							<Image src={category.image} alt={`BORN UZBEK - ${category.title}`} fill />
							<p className={unbounded.className}>{category.title.split(' ').join('\n')}</p>
						</div>
					))}
				</div>
				<div className={classes.list} role='tabpanel'>
					{data.categories.filter(c => c.key === selectedCategory)[0].products.map(product => (
						<article key={product.id} tabIndex={0}>
							<Image src={product.image} alt={`BORN UZBEK - ${product.type} ${product.title}`} fill />
							<span role='definition'>{product.type}</span>
							<span role='tooltip' data-title={product.material} tabIndex={0}><StarIcon /></span>
							<div role='contentinfo' className={classes.info}>
								<h2 className={unbounded.className}>{product.title}</h2>
								<p className={[classes.price, unbounded.className].join(' ')}>{Intl.NumberFormat().format(product.price)} сум</p>
								<small>{product.description}</small>
								<a href={product.url} rel='noreferrer' target='_blank'>Купить <LinkIcon /></a>
							</div>
						</article>
					))}
				</div>
			</section>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await getStaticData()

	return {
		props: {
			data
		}
	}
}

export default HomePage
