import HeadphoneStrikedIcon from '@/assets/icons/headphone-striked.svg'
import HeadphoneIcon from '@/assets/icons/headphone.svg'
import CategoryCard from '@/components/category-card'
import Layout from '@/components/layout'
import ProductCard from '@/components/product-card'
import productsData from '@/products-list.json'
import classes from '@/styles/index.module.scss'
import localFont from 'next/font/local'
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
		</Layout>
	)
}

export default HomePage
