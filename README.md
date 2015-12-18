# SSD Select
jQuery plugin to handle most common events associated with the form 'select' tag.

## Usage instructions

First include all resources and call the plugin

```
<script src="./node_modules/jquery/dist/jquery.min.js"></script>
<script src="./node_modules/ssd-select/src/jquery.ssd-select.min.js"></script>
<script>
    $.fn.ssdSelect({
        selector : '[data-ssd-select]',
        type_attribute : 'data-ssd-select',
        hideClass: 'dn'
    });
</script>
```

- The `selector` represents the attribute that will attach the plugin to the element.
- The `type_attribute` represents the attribute that will store the type of the event required.
- The `hideClass` is used to specify the class name that has `display` set to `none` as it will be used to show and hide certain elements.

```
.dn {
    display: none;
}
```

You're now ready to apply it to your `select` elements

### Make ajax call and redirect `call-redirect`

```
<select data-ssd-select="call-redirect">
    <option value="/">Select one</option>
    <option value="./calls/redirect.json">First</option>
    <option value="./calls/redirect.json">Second</option>
</select>
```

Ajax call should return the response in the following format:

```
{
  "redirect": "http://ssdtutorials.com"
}
```

### Make ajax call and reload the page `call-reload`

```
<select data-ssd-select="call-reload">
    <option value="/">Select one</option>
    <option value="./calls/reload.json">First</option>
    <option value="./calls/reload.json">Second</option>
</select>
```

No response needed for this call.

### Make ajax call and replace content `call-replace`

```
<select data-ssd-select="call-replace">
    <option value="/">Select one</option>
    <option value="./calls/replace.json">Replace</option>
</select>

<div class="first-replacement">First</div>
<div class="second-replacement">Second</div>
```

Ajax call should return the response in the following format:

```
{
  "replace": {
    ".first-replacement": "First replacement",
    ".second-replacement": "Second replacement"
  }
}
```

### Make ajax call and replace elements `call-replace-with`

<select data-ssd-select="call-replace-with">
    <option value="/">Select one</option>
    <option value="./calls/replace-with.json">Replace</option>
</select>

<div class="first-replacement-with">First</div>
<div class="second-replacement-with">Second</div>

Ajax call should return the response in the following format:

```
{
  "replace": {
    ".first-replacement-with": "<p>First replacement with</p>",
    ".second-replacement-with": "<p>Second replacement with</p>"
  }
}
```

### Navigate to `go-to`

```
<select data-ssd-select="go-to">
    <option value="/">Select one</option>
    <option value="./calls/go-to-1.html">First</option>
    <option value="./calls/go-to-2.html">Second</option>
</select>
```

### Show selected and hide others `show-hide`

```
<select data-ssd-select="show-hide">
    <option value="/">Select one</option>
    <option value="#" data-target=".first">First</option>
    <option value="#" data-target=".second">Second</option>
    <option value="#">Third</option>
</select>

<div class="first">First</div>
<div class="second dn">Second</div>
```