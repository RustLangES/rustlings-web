import { useMemo } from "react"

export default function usePanelContainerBreakpoints(width: number) {
	const size = useMemo(() => {
		if (width >= 1440) return 4
		if (width >= 1024) return 5
		if (width >= 768) return 8
		if (width >= 640) return 10
		if (width >= 480) return 14
		return 18
	}, [width])

	return { size }
}
