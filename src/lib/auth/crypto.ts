const ITERATIONS = 100_000
const HASH_LENGTH = 32
const SALT_LENGTH = 16

function bufToHex(buf: ArrayBuffer): string {
	return Array.from(new Uint8Array(buf))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("")
}

function hexToBuf(hex: string): Uint8Array {
	const result = new Uint8Array(hex.length / 2)
	for (let i = 0; i < hex.length; i += 2) {
		result[i / 2] = parseInt(hex.slice(i, i + 2), 16)
	}
	return result
}

export async function hashPassword(password: string): Promise<string> {
	const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
	const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
		"deriveBits",
	])
	const hash = await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
		keyMaterial,
		HASH_LENGTH * 8,
	)
	return `${bufToHex(salt)}:${bufToHex(hash)}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
	const [saltHex, hashHex] = stored.split(":")
	if (!saltHex || !hashHex) return false
	const salt = hexToBuf(saltHex)
	const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
		"deriveBits",
	])
	const hash = await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
		keyMaterial,
		HASH_LENGTH * 8,
	)
	return bufToHex(hash) === hashHex
}

export function generateToken(): string {
	return bufToHex(crypto.getRandomValues(new Uint8Array(32)))
}

export function generateId(): string {
	return crypto.randomUUID()
}
