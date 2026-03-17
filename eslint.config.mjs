import uni from '@uni-helper/eslint-config'

export default uni(
    {
        languageOptions: {
            globals: {
                getCurrentPages: 'readonly',
                uni: 'readonly',
                getApp: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
            'eslint-comments/no-unlimited-disable': 'off',
            'style/indent': ['error', 4],
            'style/no-tabs': 'error',
            'vue/html-indent': ['error', 4],
            'vue/script-indent': ['error', 4, { baseIndent: 0 }],
            'jsonc/indent': ['error', 4],
            'yaml/indent': ['error', 4],
            'vue/no-restricted-component-options': ['error', 'mixins'],
            'no-restricted-globals': ['error', { name: 'wx', message: '禁止使用 wx.xxx，请使用 uni.xxx 替代' }],
        },
        ignores: [
            'src/uni_modules/**/*',
            'custom-tab-bar/**/*',
            '**/*.md',
        ],
    },
)
