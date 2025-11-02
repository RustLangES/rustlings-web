interface CompilationStatusProps {
	success: boolean
}

export default function CompilationStatus({ success }: CompilationStatusProps) {
	return (
		<div className={`font-semibold ${success ? "text-emerald-400" : "text-red-500"}`}>
			{success ? "✓ Compilado exitosamente" : "✗ Error de compilación"}
		</div>
	)
}
