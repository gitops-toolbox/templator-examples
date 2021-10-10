const tap = require('tap');
const { execSync } = require('child_process');

const tp = 'node_modules/.bin/tp';
const baseDir = '-b gitconfigs';

tap.test('Given gitconfigs base dir', (t) => {
  t.plan(3);

  t.test('Should show the context on stdout', (t) => {
    t.plan(1);
    const result = execSync(`${tp} ${baseDir} context`, {
      encoding: 'utf-8',
    });
    t.strictSame(JSON.parse(result), {
      common_templates: {
        'github/workflows/npm-test.yaml': true,
      },
      repos: {
        templator: {
          'github/workflows/npm-test.yaml': true,
        },
        'config-loader': {},
        'github-tools': {},
      },
    });
  });

  t.test('Should render the gitconfigs.js mapping', (t) => {
    t.plan(1);

    const result = execSync(`${tp} generate --just-mapping gitconfigs.js`, {
      encoding: 'utf-8',
      env: { TP_BASE_DIR: 'gitconfigs' },
    });

    t.strictSame(
      JSON.parse(result),
      require('./fixtures/js_mapping_output.json')
    );
  });

  t.test('Should render the gitconfigs.js', (t) => {
    t.plan(1);

    const result = execSync(`${tp} generate gitconfigs.js`, {
      encoding: 'utf-8',
      env: { TP_BASE_DIR: 'gitconfigs', TP_OUTPUT: 'json' },
    });

    t.strictSame(
      JSON.parse(result),
      require('./fixtures/generate_js_output.json')
    );
  });
});
