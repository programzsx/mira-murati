// Hexo script: add ==highlight== markdown syntax support via marked extension
// Renders ==text== as <mark>text</mark>

hexo.extend.filter.register('marked:extensions', function(extensions) {
  extensions.push({
    name: 'mark',
    level: 'inline',
    start(src) {
      // Return the index where == starts
      return src.indexOf('==');
    },
    tokenizer(src) {
      const match = src.match(/^==([^=]+)==/);
      if (match) {
        return {
          type: 'mark',
          raw: match[0],
          text: match[1]
        };
      }
    },
    renderer(token) {
      return `<mark>${token.text}</mark>`;
    }
  });
  return extensions;
});
