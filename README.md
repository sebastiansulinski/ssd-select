# SSD Select
jQuery plugin to handle most common events associated with the form 'select' tag.

[See demo](http://ssd-select.ssdtutorials.com/)

## Installation

You can install this plugin via `npm`:

```
npm install ssd-select
```

## Usage instructions

First include all resources and call the plugin

```
<script src="./node_modules/jquery/dist/jquery.min.js"></script>
<script src="./node_modules/ssd-select/src/jquery.ssd-select.min.js"></script>
```

### Instantiating the plugin

To instantiate the plugin you have two options.
You strictly specify what action you want to bind to a given element

```
<script>
    $('[data-ssd-select]').ssdSelect({
        action : 'call-redirect'
    });
</script>
```

or you can tell it to dynamically obtain it from a specific attribute of that element (default is `data-ssd-select`)

```
<script>
    $('[data-ssd-select]').ssdSelect({
        action_attribute : 'data-ssd-select'
    });
</script>
```

Additionally, you need to provide the name of the css class that will hide elements from the view (default is `dn`)

```
<script>
    $('[data-ssd-select]').ssdSelect({
        hide_class : 'dn'
    });
</script>
```

- The `action` allows you to specify a single action to be used on the select object.
- The `action_attribute` represents the attribute that will store the type of the action required for a given select object.
- The `hide_class` is used to specify the class name that has `display` set to `none` as it will be used to show and hide certain elements.

```
.dn {
    display: none;
}
```

### Available actions

You're now ready to apply it to your `select` elements

#### Make ajax call and redirect `call-redirect`

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

#### Make ajax call and reload the page `call-reload`

```
<select data-ssd-select="call-reload">
    <option value="/">Select one</option>
    <option value="./calls/reload.json">First</option>
    <option value="./calls/reload.json">Second</option>
</select>
```

No response needed for this call.

#### Make ajax call and replace content `call-replace`

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

#### Make ajax call and replace elements `call-replace-with`

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

#### Make ajax call and perform action returned with the response `call-action`

```
<select data-ssd-select="call-action">
    <option value="/">Select one</option>
    <option value="./calls/action-redirect.json">Redirect</option>
    <option value="./calls/action-reload.json">Reload</option>
    <option value="./calls/action-replace.json">Replace</option>
    <option value="./calls/action-replace-with.json">Replace with</option>
</select>

<div class="action-first-replacement">First</div>
<div class="action-second-replacement">Second</div>

<div class="action-third-replacement-with">Third</div>
<div class="action-fourth-replacement-with">Fourth</div>
```

Ajax call should return the response as it would for any of the relevant actions plus the index `action` to indicate the desired action i.e.

```
{
  "action": "redirect",
  "redirect": "http://ssdtutorials.com"
}
```


#### Navigate to `go-to`

```
<select data-ssd-select="go-to">
    <option value="/">Select one</option>
    <option value="./calls/go-to-1.html">First</option>
    <option value="./calls/go-to-2.html">Second</option>
</select>
```

#### Show selected and hide others `show-hide`

```
<select data-ssd-select="show-hide">
    <option value="/">Select one</option>
    <option value="#" data-target=".first">First</option>
    <option value="#" data-target=".second">Second</option>
    <option value="#" data-target=".third">Third</option>
</select>

<div class="first">First</div>
<div class="second dn">Second</div>
<div class="third dn">Third</div>
```