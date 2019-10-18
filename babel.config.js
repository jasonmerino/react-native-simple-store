module.exports = (api) => {

	if (api && api.cache) {
		api.cache(true);
	}
	
	// throws bundling failed: TypeError: Cannot read property 'cache' of undefined is same cases
	return {
		presets: [
			"@babel/preset-env",
			"@babel/preset-react",
			"@babel/preset-flow"
		],
		plugins: [
			"@babel/plugin-proposal-class-properties",
			"@babel/plugin-proposal-export-default-from"
		]
	}
};
