export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.b05899be.js","app":"_app/immutable/entry/app.96515369.js","imports":["_app/immutable/entry/start.b05899be.js","_app/immutable/chunks/index.0d720c10.js","_app/immutable/chunks/singletons.12245b70.js","_app/immutable/chunks/index.64aa6510.js","_app/immutable/entry/app.96515369.js","_app/immutable/chunks/index.0d720c10.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export const prerendered = new Set([]);
