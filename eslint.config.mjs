import uni from '@uni-helper/eslint-config'

export default uni(
    {
        languageOptions: {
            globals: {
                getCurrentPages: 'readonly',
                uni: 'readonly',
                wx: 'readonly',
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
        },
        ignores: [
            'src/uni_modules/**/*',
            'custom-tab-bar/**/*',
            '**/*.md',
        ],
    },
)
