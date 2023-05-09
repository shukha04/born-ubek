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
			offset: 120,
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
				>Born Uzbek - первый и единственный Streetstyle бренд, активно популяризующий моду на оверсайз и использующий этот формат в качестве ключевого направления в создании своих коллекций.</h2>
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
						<p>Концепция бренда заключается в минимализме, высоком качестве изделия из 100% органического узбекского хлопка и различных принтах с призывом, которые не только отражают истинный патриотизм, но и вдохновляют творить, созидать, развиваться и двигаться вперед к своим целям. Потому что именно эти ценности объединяют всех, кто рожден на узбекской земле.
							<br /><br />Безусловно, никто не станет истинным патриотом от того, что носит футболку с гербом или размахивает национальным флагом. Поэтому в основе бренда лежит фокус на идеях, которые ежедневно движут простых людей к большим целям. А высочайшее качество изделия обеспечивает им комфорт и уверенность в достижении поставленных целей. Каждый успех любого узбекистанца – успех всего Узбекистана!
							<br /><br />Мы гордимся нашим хлопком!
							<br />Мы гордимся нашим народом!
							<br />Мы гордимся тем, что мы рождены узбекистанцами!</p>
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
						<p>Узбекистан гордится тем, что занимает лидирующее место в мире по выращиванию и производству хлопковых изделий, а в Восточном полушарии – первое место. Хлопок является национальным богатством наравне с золотом, поэтому его также называют «Ок олтин», что переводится как «Белое золото». Выращивание и сбор хлопка — очень важная традиция для народа Узбекистана. Сезон сбора приходится на сентябрь.

							<br /><br />То, что международные крупнейшие текстильные бренды пользуются нашим узбекским хлопком сегодня, никого не удивляет. Узбекское хлопковое волокно славится своим высоким качеством, чрезвычайной белизной, скороспелостью, высокими технологическими качествами, поэтому полностью соответствует мировым требованиям текстильной промышленности.

							<br /><br />Изделия, изготовленные из 100% хлопка, отличаются своим высоким качеством, износостойкостью и приятны в носке, так как хорошо пропускают воздух, впитывают лишнюю влагу, а еще приятные на ощупь.
						</p>
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
					priority
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
