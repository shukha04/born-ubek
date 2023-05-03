import FacebookIcon from '@/assets/icons/facebook.svg'
import InstagramIcon from '@/assets/icons/instagram.svg'
import TelegramIcon from '@/assets/icons/telegram.svg'
import classes from '@/components/navbar.module.scss'
import useScrollY from '@/hooks/useScrollY'
import Image from 'next/image'
import { useState } from 'react'

const Navbar = () => {
	const [mobileOpen, setMobileOpen] = useState<boolean>(false)

	// listening scroll event at certain point
	const scrolled = useScrollY(y => y > 0)

	const handleNav = () => {
		if (!mobileOpen) {
			window.document.documentElement.style.overflowY = 'hidden'
		} else {
			window.document.documentElement.style.overflowY = 'initial'
		}
		setMobileOpen(prev => !prev)
	}

	return (
		<>
			<nav className={mobileOpen ? [classes.mobile, classes.open].join(' ') : classes.mobile}>
				<ul>
					<li>
						<a href='#products'>Продукция</a>
					</li>
					<li>
						<a href='#about'>О бренде</a>
					</li>
					<li>
						<a href='#contacts'>Контакты</a>
					</li>
					<li className={classes.social}>
						<a href='https://youtube.com' target='_blank' rel='noreferrer'>
							<InstagramIcon />
						</a>
					</li>
					<li className={classes.social}>
						<a href='https://youtube.com' target='_blank' rel='noreferrer'>
							<TelegramIcon />
						</a>
					</li>
					<li className={classes.social}>
						<a href='https://youtube.com' target='_blank' rel='noreferrer'>
							<FacebookIcon />
						</a>
					</li>
				</ul>
			</nav>
			<nav className={scrolled ? [classes.navbar, classes.filled].join(' ') : classes.navbar}>
				<ul>
					<li>
						<a href='#products'>Продукция</a>
					</li>
					<li>
						<a href='#about'>О бренде</a>
					</li>
					<li>
						<a href='#contacts'>Контакты</a>
					</li>
				</ul>
				<ul>
					<li>
						<a href='https://youtube.com' target='_blank' rel='noreferrer'>
							<InstagramIcon />
						</a>
					</li>
					<li>
						<a href='https://youtube.com' target='_blank' rel='noreferrer'>
							<TelegramIcon />
						</a>
					</li>
					<li>
						<a href='https://youtube.com' target='_blank' rel='noreferrer'>
							<FacebookIcon />
						</a>
					</li>
				</ul>
				<button onClick={handleNav}>
					<span />
					<span />
					<span />
				</button>
			</nav>
			<div className={scrolled ? [classes.logo_wrapper, classes.top].join(' ') : classes.logo_wrapper}>
				<Image
					src='/logo.svg'
					alt='BORN UZBEK logotype'
					fill
				/>
			</div>
		</>
	)
}

export default Navbar
