import { IconBrandGithub, IconMenu2, IconX } from "@tabler/icons-react"
import { useState } from "react"

const logoSrc = "/logo.svg"
const githubUrl = "https://github.com/RustLangES/rustlings-web"

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	const menuItems = [
		{ href: "#hero", label: "Inicio" },
		{ href: "#playground", label: "Lecciones" },
		{ href: "#community", label: "Comunidad" },
	]

	return (
		<nav className="fixed top-0 left-0 w-full z-50 bg-[var(--editor-bg)]/95 backdrop-blur-md border-b border-[var(--stroke-color)] shadow-md">
			<div className="max-w-9xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3">
				{/* Logo */}
				<a href="#hero" className="flex items-center gap-2">
					<img src={logoSrc} alt="Rustlings Web" className="h-10 w-10" />
					<span className="text-[var(--fg)] font-bold text-xl sm:text-2xl tracking-wide">Rustlings</span>
				</a>

				{/* Desktop Menu centrado */}
				<div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-10">
					{menuItems.map((item) => (
						<a
							key={item.label}
							href={item.href}
							className="text-[var(--fg)] hover:text-[var(--yellow)] font-medium transition-colors"
						>
							{item.label}
						</a>
					))}
				</div>

				{/* GitHub + Mobile Toggle */}
				<div className="flex items-center gap-4">
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[var(--fg)] hover:text-[var(--yellow)] transition-colors"
					>
						<IconBrandGithub size={28} stroke={2} />
					</a>

					<button
						type="button"
						className="lg:hidden text-[var(--fg)] focus:outline-none"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? <IconX size={28} stroke={2} /> : <IconMenu2 size={28} stroke={2} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`lg:hidden absolute top-full right-4 left-4 mt-2 bg-[var(--editor-bg)] rounded-lg shadow-lg overflow-hidden transition-[max-height] duration-300 ease-in-out ${
					isOpen ? "max-h-96 border border-[var(--stroke-color)]" : "max-h-0 border-0"
				}`}
			>
				{menuItems.map((item) => (
					<a
						key={item.label}
						href={item.href}
						onClick={() => setIsOpen(false)}
						className="block px-6 py-3 text-center text-[var(--fg)] hover:bg-[var(--stroke-color)] transition-colors font-medium"
					>
						{item.label}
					</a>
				))}
			</div>
		</nav>
	)
}
