# Design Architecture

The library separates:

1. semantic foundations;
2. application themes;
3. generic UI components;
4. structural patterns;
5. business implementations owned by consuming applications.

Theme, color mode, and density are independent:

```html
<html data-theme="prestix" data-mode="dark" data-density="dense"></html>
```
