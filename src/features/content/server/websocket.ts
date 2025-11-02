const RUST_LANG_WS = "wss://play.rust-lang.org/websocket"

let sequenceNumber = 0

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
	private ws: WebSocket | null = null
	private ready = false
	private execution: {
		stdout: string
		stderr: string
		resolve: (result: ExecutionResult) => void
		onStdout?: MessageHandler
		onStderr?: MessageHandler
	} | null = null

	async connect(): Promise<void> {
		if (this.ready) return

		return new Promise((resolve) => {
			this.ws = new WebSocket(RUST_LANG_WS)

			this.ws.onopen = () => {
				this.ws!.send(
					JSON.stringify({
						type: "websocket/connected",
						payload: { iAcceptThisIsAnUnsupportedApi: true },
						meta: { websocket: true, sequenceNumber: ++sequenceNumber },
					}),
				)
				this.ready = true
				resolve()
			}

			this.ws.onmessage = (event) => {
				if (!this.execution) return

				const { type, payload } = JSON.parse(event.data)

				if (type === "output/execute/wsExecuteStdout") {
					this.execution.stdout += payload
					this.execution.onStdout?.(payload)
				} else if (type === "output/execute/wsExecuteStderr") {
					this.execution.stderr += payload
					this.execution.onStderr?.(payload)
				} else if (type === "output/execute/wsExecuteEnd") {
					this.execution.resolve({
						success: payload.success,
						stdout: this.execution.stdout,
						stderr: this.execution.stderr,
					})
					this.execution = null
				}
			}

			this.ws.onclose = () => {
				this.ready = false
				this.ws = null
			}
		})
	}

	async execute(
		code: string,
		options: ExecuteOptions,
		onStdout?: MessageHandler,
		onStderr?: MessageHandler,
	): Promise<ExecutionResult> {
		await this.connect()

		return new Promise((resolve) => {
			this.execution = { stdout: "", stderr: "", resolve, onStdout, onStderr }

			this.ws!.send(
				JSON.stringify({
					type: "output/execute/wsExecuteRequest",
					payload: {
						channel: options.channel,
						mode: options.mode,
						edition: options.edition,
						crateType: "bin",
						tests: false,
						code,
						backtrace: false,
					},
					meta: { websocket: true, sequenceNumber: ++sequenceNumber },
				}),
			)
		})
	}
}

export const rustPlayground = new RustPlayground()
