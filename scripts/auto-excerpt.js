// Auto-excerpt: posts without <!-- more --> get auto-generated excerpt
hexo.extend.filter.register('after_post_render', function(data) {
  if (data.excerpt) return data; // already has <!-- more -->

  var content = data.content;
  // Strip HTML tags, trim whitespace
  var text = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  // Take first ~200 chars, break at sentence/paragraph boundary
  var maxLen = 200;
  if (text.length <= maxLen) {
    data.excerpt = content;
    data.more = '';
    return data;
  }

  // Find a good break point
  var cut = text.indexOf('。', maxLen - 30);
  if (cut === -1 || cut > maxLen + 50) {
    cut = text.indexOf('；', maxLen - 30);
  }
  if (cut === -1 || cut > maxLen + 50) {
    cut = text.indexOf('，', maxLen - 30);
  }
  if (cut === -1 || cut > maxLen + 50) {
    cut = maxLen;
  }

  var excerptText = text.substring(0, cut + 1);

  // Find corresponding position in original HTML content
  // Simple approach: use the text length to find a good cut in HTML
  var htmlCut = 0;
  var charCount = 0;
  var inTag = false;
  for (var i = 0; i < content.length && charCount < excerptText.length; i++) {
    if (content[i] === '<') inTag = true;
    else if (content[i] === '>') inTag = false;
    else if (!inTag) {
      if (content[i] !== '\n' && content[i] !== '\r') {
        charCount++;
      }
    }
    htmlCut = i;
  }

  data.excerpt = content.substring(0, htmlCut + 1);
  data.more = content.substring(htmlCut + 1);

  return data;
});
