const CracoLessPlugin = require('craco-less');
const {getThemeVariables} = require('antd/dist/theme');
const compactTheme = getThemeVariables({
    // dark: true, // 开启暗黑模式
    compact: true, // 开启紧凑模式
})
module.exports = {
    webpack: {},
    babel: {
        plugins: [
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": true //设置为true即是less
                },
            ]
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {

                        modifyVars: {
                            ...compactTheme,
                            '@primary-color': '#EF4566'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};