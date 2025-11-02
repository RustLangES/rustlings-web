const RUST_PLAYGROUND_API = "https://play.rust-lang.org/execute"

export interface ExecuteOptions {
	channel?: "stable" | "beta" | "nightly"
	mode?: "debug" | "release"
	edition?: "2015" | "2018" | "2021" | "2024"
}

export interface ExecutionResult {
	success: boolean
	stdout: string
	stderr: string
}

type MessageHandler = (data: string) => void

class RustPlayground {
	async execute(
		code: string,
		options: ExecuteOptions = {},
		onStdout?: MessageHandler,
		onStderr?: MessageHandler,
	): Promise<ExecutionResult> {
		try {
			const response = await fetch(RUST_PLAYGROUND_API, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code,
					channel: options.channel || "stable",
					mode: options.mode || "debug",
					edition: options.edition || "2021",
					crateType: "bin",
					tests: false,
					backtrace: false,
				}),
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const result = await response.json()

			if (onStdout && result.stdout) {
				onStdout(result.stdout)
			}
			if (onStderr && result.stderr) {
				onStderr(result.stderr)
			}

			return {
				success: result.success,
				stdout: result.stdout || "",
				stderr: result.stderr || "",
			}
		} catch (error) {
			console.error("Error al ejecutar código:", error)
			throw error
		}
	}
}

export const rustPlayground = new RustPlayground()
