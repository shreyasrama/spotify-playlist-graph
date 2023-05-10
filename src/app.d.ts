/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Platform {
		env: object;
		context: {
			waitUntil(promise: Promise<any>): void;
		};
		caches: CacheStorage & { default: Cache };
	}
	// interface Locals {}
	// interface Error {}
	// interface Session {}
	// interface Stuff {}
}
