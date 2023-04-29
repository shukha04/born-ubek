import HeadphoneStrikedIcon from '@/assets/icons/headphone-striked.svg'
import HeadphoneIcon from '@/assets/icons/headphone.svg'
import CategoryCard from '@/components/category-card'
import Layout from '@/components/layout'
import ProductCard from '@/components/product-card'
import productsData from '@/products-list.json'
import classes from '@/styles/index.module.scss'
import { Nunito_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import { Fragment, useState } from 'react'

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

const nunitoSans = Nunito_Sans({
	preload: true,
	weight: ['600', '700'],
	subsets: ['cyrillic']
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
const categories: { key: string, name: string, image: string }[] = [
	{key: 'men', name: 'Мужская одежда', image: '/category-men.jpg'},
	{key: 'women', name: 'Женская одежда', image: '/category-women.jpg'}
]

const HomePage = () => {
	const [muted, setMuted] = useState<boolean>(true)
	const [activeCategory, setActiveCategory] = useState<string>('men')

	const handleMute = () => {
		setMuted(p => !p)
	}

	const handleSelectCategory = (category: string) => {
		setActiveCategory(category)
	}

	return (
		<Layout className={FuturaPTFont.className}>
			<section className={classes.main}>
				<video
					autoPlay
					muted={muted}
					loop
					disablePictureInPicture
					aria-disabled
					disableRemotePlayback
					poster='/main-bg-preview.jpg'
					preload='none'
				>
					<source src='/main-bg.webm' type='video/webm' />
					<source src='/main-bg.mp4' type='video/mp4' />
				</video>
				<div className={classes.roller}>
					<ul>
						{[...quotes, ...quotes].map((quote, i) => (
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
			<section className={classes.products}>
				<div className={classes.categories}>
					{categories.map((category) => (
						<CategoryCard category={category} className={classes.category} key={category.key} onClick={handleSelectCategory} />
					))}
				</div>
				<div className={classes.list}>
					{productsData.products.filter(c => c.category === activeCategory).map((product) => (
						<ProductCard product={product} key={product.id} />
					))}
				</div>
			</section>
			<section className={classes.about}>
				<h2 className={nunitoSans.className}>BORN UZBEK - первый и единственный Streetstyle бренд, активно популяризующий моду на оверсайз и использующий этот формат в качестве ключевого направления в создании своих коллекций.</h2>
				<article>
					<div>
						<header className={nunitoSans.className}>Бренд был основан в 2020 году, как творческое подразделение, специализирующееся на дизайнерской полиграфии.</header>
						<p>Отдавая дань гламуру и изобилию прошлых десятилетий, нью-йоркский лейбл получил свое название от слияния синонимов «винтаж» и «вечеринка». Оживленная энергией «больше значит больше», Bornuzbek стирает грань между днем и ночью, создавая эстетику вечеринки в каждом дизайне. Переливчатые пайетки, современный и винтажный деним и изысканные силуэты из шелка — каждая деталь вызывает чувство ностальгии с модным взглядом на уверенные и сексуальные стили.</p>
					</div>
					<span>
						<Image
							src='/about-1.png'
							alt='Бренд был основан в 2020 году, как творческое подразделение, специализирующееся на дизайнерской полиграфии.'
							fill
						/>
					</span>
				</article>
				<article>
					<span>
						<Image src='/about-2.jpg' alt='Создатель бренда №1 в Узбекистане.' fill />
					</span>
					<div>
						<svg viewBox='0 0 100 100' width='250' height='250' fill='#FFFFFF'>
							<defs>
								<path
									id='circular-title'
									d='
									M 50 50
									m -40, 0
									a 41, 41 0 1,1 82, 0
									a 41, 41 0 1,1 -82, 0'
								/>
							</defs>
							<text fontSize='10px'>
								<textPath xlinkHref='#circular-title' className={nunitoSans.className}>
									Создатель бренда №1 в Узбекистане.
								</textPath>
							</text>
						</svg>
						<p>Родившийся и выросший в Израиле, Охад Сероя провел большую часть своей профессиональной карьеры в мире моды, даже когда ему было всего 16 лет. Работая во всех отделах, от закупок до управления выставочным залом, Сероя знал, что у него есть будущее в этой отрасли. Когда он и его муж Авиад Клин переехали в США, они начали работать над собственными торговыми марками и специальными проектами для своих клиентов. После многих лет работы в отрасли и помощи в развитии различных брендов дуэт осознал пробел на рынке. Клин подтолкнул их к созданию бренда с собственной ДНК, что быстро привело к созданию Retrofête в 2018 году. Руководствуясь желанием создавать эффектные вещи, бренд известен тем, что создает эмоциональные и роскошные образы готовой одежды, которые делают каждая женщина чувствует себя уверенно, сексуально и сияюще.</p>
					</div>
				</article>
			</section>
			<section className={classes.banner} role='banner'>
				<Image src='/banner.jpg' alt='Основная миссия - развитие патриотизма' fill />
				<h2 className={nunitoSans.className}>Основная миссия - развитие патриотизма </h2>
			</section>
		</Layout>
	)
}

export default HomePage
