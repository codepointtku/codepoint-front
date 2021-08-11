module.exports = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
        'react-i18next': '<rootDir>/__mocks__/translateMock.js',
    },
}