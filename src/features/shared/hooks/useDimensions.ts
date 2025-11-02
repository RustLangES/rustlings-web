import { useCallback, useEffect, useRef, useState } from "react"

export type Dimensions = { width: number; height: number }

export default function useDimensions<T extends Element>() {
	const nodeRef = useRef<T | null>(null)
	const observerRef = useRef<ResizeObserver | null>(null)
	const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

	const ref = useCallback((node: T | null) => {
		if (observerRef.current && nodeRef.current) {
			observerRef.current.unobserve(nodeRef.current)
		}

		nodeRef.current = node

		if (!node) return

		if (typeof ResizeObserver === "undefined") {
			const rect = node.getBoundingClientRect()
			setDimensions({ width: rect.width, height: rect.height })
			return
		}

		if (!observerRef.current) {
			observerRef.current = new ResizeObserver((entries) => {
				const entry = entries[0]
				if (!entry) return
				const { width, height } = entry.contentRect
				setDimensions({ width, height })
			})
		}

		observerRef.current.observe(node)
	}, [])

	useEffect(() => {
		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
				observerRef.current = null
			}
		}
	}, [])

	return [ref, dimensions] as const
}
