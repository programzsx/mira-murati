// Hexo script: generate /categories/ and /tags/ index pages
// hexo-generator-category v2 only creates individual category pages,
// so we generate the index listing pages here.

hexo.extend.generator.register('category-index', function(locals) {
  if (!locals.categories || locals.categories.length === 0) return [];

  return {
    path: 'categories/index.html',
    data: {
      title: hexo.config.title,
      type: 'categories'
    },
    layout: 'category'
  };
});

hexo.extend.generator.register('tag-index', function(locals) {
  if (!locals.tags || locals.tags.length === 0) return [];

  return {
    path: 'tags/index.html',
    data: {
      title: hexo.config.title,
      type: 'tags'
    },
    layout: 'tag'
  };
});
