import HeadphoneStrikedIcon from '@/assets/icons/headphone-striked.svg'
import HeadphoneIcon from '@/assets/icons/headphone.svg'
import LinkIcon from '@/assets/icons/link.svg'
import StarIcon from '@/assets/icons/star.svg'
import InstaPost, { InstaPostType } from '@/components/insta-post'
import Layout from '@/components/layout'
import getStaticData, { JSONData } from '@/pages/api/staticdata'
import classes from '@/styles/index.module.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { Unbounded } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import Rellax from 'rellax'

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

const HomePage = ({data, posts}: { data: JSONData, posts: InstaPostType[] }) => {
	const [muted, setMuted] = useState<boolean>(true)
	const [selectedCategory, setSelectedCategory] = useState<string>('men')

	const videoRef = useRef<HTMLVideoElement>(null)
	const bannerRef = useRef<HTMLImageElement>(null)

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

	const handleBannerLoad = () => {
		new Rellax(bannerRef.current || undefined, {
			speed: 2,
			center: true,
			vertical: true
		})
	}

	useEffect(() => {
		AOS.init({
			offset: 180,
			duration: 500,
			easing: 'ease-out'
		})
	}, [])

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
							<p className={unbounded.className} data-aos='fade-up' data-aos-duration={200}>{category.title.split(' ')
								.join('\n')}</p>
						</div>
					))}
				</div>
				<div className={classes.list} role='tabpanel'>
					{data.categories.filter(c => c.key === selectedCategory)[0].products.map(product => (
						<article key={product.id} tabIndex={0} data-aos='fade-down'>
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
			<section className={classes.about} id='about'>
				<h2
					className={unbounded.className}
					data-aos='fade-down-right'
				>BORN UZBEK - первый и единственный Streetstyle бренд, активно популяризующий моду на оверсайз и использующий этот формат в качестве ключевого направления в создании своих коллекций.</h2>
				<article className={classes.info}>
					<div className={classes.image} data-aos='slide-left' data-aos-offset={0}>
						<Image
							src='/about-1.png'
							alt='BORN UZBEK - Бренд был основан в 2020 году, как творческое подразделение, специализирующееся на дизайнерской полиграфии.'
							fill
						/>
					</div>
					<div className={classes.text} data-aos='slide-right' data-aos-offset={0}>
						<h3
							className={unbounded.className}
						>Бренд был основан в 2020 году, как творческое подразделение, специализирующееся на дизайнерской полиграфии.</h3>
						<p>Отдавая дань гламуру и изобилию прошлых десятилетий, нью-йоркский лейбл получил свое название от слияния синонимов «винтаж» и «вечеринка». Оживленная энергией «больше значит больше», Bornuzbek стирает грань между днем и ночью, создавая эстетику вечеринки в каждом дизайне. Переливчатые пайетки, современный и винтажный деним и изысканные силуэты из шелка — каждая деталь вызывает чувство ностальгии с модным взглядом на уверенные и сексуальные стили.</p>
					</div>
				</article>
				<article className={classes.ceo}>
					<div className={classes.image} data-aos='slide-right' data-aos-offset={0}>
						<Image
							src='/about-2.jpg'
							alt='BORN UZBEK - Бренд был основан в 2020 году, как творческое подразделение, специализирующееся на дизайнерской полиграфии.'
							fill
						/>
					</div>
					<div className={classes.text} data-aos='slide-left' data-aos-offset={0}>
						<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
							<path
								fill='none'
								id='circle'
								d='
								M 8, 50
								a 42,42 0 1,1 84,0
								42,42 0 1,1 -84,0'
							/>
							<text>
								<textPath
									href='#circle'
									letterSpacing='0.05em'
									fontWeight='600'
									className={unbounded.className}
								>
									Создатель бренда №1 в Узбекистане
								</textPath>
							</text>
						</svg>
						<p>Родившийся и выросший в Израиле, Охад Сероя провел большую часть своей профессиональной карьеры в мире моды, даже когда ему было всего 16 лет. Работая во всех отделах, от закупок до управления выставочным залом, Сероя знал, что у него есть будущее в этой отрасли. Когда он и его муж Авиад Клин переехали в США, они начали работать над собственными торговыми марками и специальными проектами для своих клиентов. После многих лет работы в отрасли и помощи в развитии различных брендов дуэт осознал пробел на рынке. Клин подтолкнул их к созданию бренда с собственной ДНК, что быстро привело к созданию Retrofête в 2018 году. Руководствуясь желанием создавать эффектные вещи, бренд известен тем, что создает эмоциональные и роскошные образы готовой одежды, которые делают каждая женщина чувствует себя уверенно, сексуально и сияюще.</p>
					</div>
				</article>
			</section>
			<div role='banner' className={classes.banner}>
				<Image
					src='/banner.jpg'
					alt='Основная миссия - развитие патриотизма'
					width={1920}
					height={1080}
					ref={bannerRef}
					onLoad={handleBannerLoad}
				/>
				<h2 className={unbounded.className} data-aos='zoom-out'>Основная миссия -<br />развитие патриотизма</h2>
			</div>
			<section className={classes.instagram}>
				<h2 className={unbounded.className}>Инстаграм</h2>
				<div>
					{posts.map(post => (
						<article key={post.id} role='link'>
							<a href={post.permalink} target='_blank' rel='noreferrer'>
								<InstaPost
									id={post.id}
									caption={post.caption}
									media_type={post.media_type}
									media_url={post.media_url}
									permalink={post.permalink}
								/>
								<LinkIcon />
							</a>
						</article>
					))}
				</div>
			</section>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await getStaticData()

	const instagramPosts: InstaPostType[] = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,permalink&limit=8&access_token=${process.env.IG_ACCESS_TOKEN}`)
		.then(res => res.data.data)

	return {
		props: {
			data,
			posts: instagramPosts
		}
	}
}

export default HomePage
