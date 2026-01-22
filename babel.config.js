module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // C'est ce plugin qui va régler ton problème de "SyntaxError import.meta"
            'babel-plugin-transform-import-meta',
        ],
    };
};