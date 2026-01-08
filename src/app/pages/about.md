---
title: About
meta:
  - name: description
    content: About Page Description
  - property: og:title
    content: About
---

## About Analog

Analog is a meta-framework for Angular.

This page is rendered from a markdown file (`about.md`) using Analog's content routes feature.

### Features

- **Markdown Support**: Write content in markdown
- **Frontmatter**: Add metadata using YAML frontmatter
- **Syntax Highlighting**: Code blocks are highlighted with PrismJS
- **Meta Tags**: SEO-friendly meta tags from frontmatter

### Code Example

Here's a TypeScript example with syntax highlighting:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '<h1>Hello Analog!</h1>'
})
export class ExampleComponent {}
```

### Diff Highlighting Example

You can also highlight code diffs:

```diff
- const oldCode = 'old value';
+ const newCode = 'new value';
```

```diff-typescript
- const foo = 'bar';
+ const foo = 'baz';
```

[Back Home](./)

