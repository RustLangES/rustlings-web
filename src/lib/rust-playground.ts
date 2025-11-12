export interface RustPlaygroundConfig {
	channel: string
	mode: string
	edition: string
	crateType: string
	tests: boolean
	backtrace: boolean
	code: string
}

const WS_URL = "wss://play.rust-lang.org/websocket"
const DEFAULT_CONFIG: Partial<RustPlaygroundConfig> = {
	channel: "stable",
	mode: "debug",
	edition: "2024",
	crateType: "bin",
	tests: false,
	backtrace: false,
}

class RustPlaygroundClient {
	private ws: WebSocket
	private sequenceNumber = 0
	private stderr = ""
	private stdout = ""
	private latestSequenceNumber = -1
	private onOutputCallback: ((stderr: string, stdout: string, done: boolean) => void) | null = null

	constructor() {
		this.ws = new WebSocket(WS_URL)
		this.ws.onopen = () => this.sendHandshake()
		this.ws.onmessage = (event) => this.handleMessage(event)
		this.ws.onerror = () => this.reconnect()
		this.ws.onclose = () => this.reconnect()
	}

	private sendHandshake(): void {
		this.send({
			type: "websocket/connected",
			payload: { iAcceptThisIsAnUnsupportedApi: true },
			meta: { websocket: true, sequenceNumber: this.sequenceNumber++ },
		})
	}

	private handleMessage(event: MessageEvent): void {
		const data = JSON.parse(event.data)
		const messageSeq = data.meta?.sequenceNumber

		if (messageSeq !== undefined && messageSeq < this.latestSequenceNumber) {
			// Ignorar mensajes de ejecuciones antiguas
			return
		}

		if (data.type === "output/execute/wsExecuteStderr") {
			this.stderr += data.payload
			this.onOutputCallback?.(this.stderr, this.stdout, false)
		} else if (data.type === "output/execute/wsExecuteStdout") {
			this.stdout += data.payload
			this.onOutputCallback?.(this.stderr, this.stdout, false)
		} else if (data.type === "output/execute/wsExecuteEnd") {
			this.onOutputCallback?.(this.stderr, this.stdout, true)
		}
	}

	private reconnect(): void {
		if (this.ws.readyState === WebSocket.CLOSED) {
			setTimeout(() => {
				this.ws = new WebSocket(WS_URL)
				this.ws.onopen = () => this.sendHandshake()
				this.ws.onmessage = (event) => this.handleMessage(event)
				this.ws.onerror = () => this.reconnect()
				this.ws.onclose = () => this.reconnect()
			}, 1000)
		}
	}

	execute(
		code: string,
		onOutput: (stderr: string, stdout: string, done: boolean) => void,
		config: Partial<RustPlaygroundConfig> = {},
	): void {
		this.stderr = ""
		this.stdout = ""
		this.onOutputCallback = onOutput

		this.latestSequenceNumber = this.sequenceNumber++

		this.send({
			type: "output/execute/wsExecuteRequest",
			payload: { ...DEFAULT_CONFIG, ...config, code },
			meta: { websocket: true, sequenceNumber: this.latestSequenceNumber },
		})
	}

	sendStdin(input: string): void {
		this.send({
			type: "output/execute/wsExecuteStdin",
			payload: input,
			meta: { websocket: true, sequenceNumber: this.latestSequenceNumber },
		})
	}

	private send(data: unknown): void {
		if (this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(data))
		} else {
			const interval = setInterval(() => {
				if (this.ws.readyState === WebSocket.OPEN) {
					this.ws.send(JSON.stringify(data))
					clearInterval(interval)
				}
			}, 100)
		}
	}
}

export const rustPlayground = new RustPlaygroundClient()
