module.exports = {
    'presets': [
      [
        'next/babel',
        {
          'preset-env': {},
          '@babel/preset-react': {
            'runtime': 'automatic'
          }
        }
      ]
    ],
  }