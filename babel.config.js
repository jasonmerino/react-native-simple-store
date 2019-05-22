module.exports = (api) => {
	api.cache(true);

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
