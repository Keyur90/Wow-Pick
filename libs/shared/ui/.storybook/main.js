const rootMain = require('../../../../.storybook/main');

// Use the following syntax to add addons!
rootMain.addons.push(...['@storybook/addon-knobs', '@storybook/addon-docs', '@storybook/addon-a11y']);
rootMain.stories.push(...['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)']);

module.exports = rootMain;
