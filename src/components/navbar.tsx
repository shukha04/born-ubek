import FacebookIcon from '@/assets/icons/facebook.svg'
import InstagramIcon from '@/assets/icons/instagram.svg'
import TelegramIcon from '@/assets/icons/telegram.svg'
import classes from '@/components/navbar.module.scss'
import useScrollY from '@/hooks/useScrollY'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Navbar = () => {
	// listening scroll event at certain point
	const scrolled = useScrollY(y => y > 0)

	const [fillNav, setFillNav] = useState<boolean>(false)

	useEffect(() => {
		setFillNav(scrolled)
	}, [scrolled])

	return (
		<>
			<nav className={fillNav ? [classes.navbar, classes.filled].join(' ') : classes.navbar}>
				<ul>
					<li>
						<Link href='/#products'>Продукция</Link>
					</li>
					<li>
						<Link href='/#about'>О бренде</Link>
					</li>
					<li>
						<Link href='/#contacts'>Контакты</Link>
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
			</nav>
			<div className={fillNav ? [classes.logo_wrapper, classes.top].join(' ') : classes.logo_wrapper}>
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
