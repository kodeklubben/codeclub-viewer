## Input

Renders an input in bootstrap wrappers. Supports label, help, text input add-ons, validation
and use as wrapper. Use `getValue()` or `getChecked()` to get the current state. 
The helper method `getInputDOMNode()` returns the internal input element. If you don't
want the `form-group` class applied apply the prop named `standalone`.

---

### Props

<table border = "1" style="width: 100%"}>
 <thead style = "background-color: GhostWhite">
 <tr>
  <th style="padding:5px">Name</th>
  <th style="padding:5px">Type</th>
  <th style="padding:5px">Default</th>
  <th style="padding:5px">Description</th>
 </tr>
 </thead>
 <tbody>
 <tr>
   <td style="padding:5px"><span>`addonAfter`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`addonBefore`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`bsSize`</span><span> </span></td>
   <td style="padding:5px"><div>one of: `small`,`medium`, `large`</div></td>
   <td style="padding:5px"></td>
   <td style="padding:5px"><div><p>Size variants</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`bsStyle`</span><span> </span></td>
   <td style="padding:5px"><div>one of: `success`, `warning`, `error`</div></td>
   <td style="padding:5px"><div>default</div></td>
   <td style="padding:5px"><div><p>Style variants</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`buttonAfter`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`buttonBefore`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`disabled`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  
  <tr>
   <td style="padding:5px"><span>`feedbackIcon`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`groupClassName`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`hasFeedback`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`help`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`id`</span><span> </span></td>
   <td style="padding:5px"><div>string | number</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`label`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`labelClassName`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`multiple`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`type`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`value`</span><span> </span></td>
   <td style="padding:5px"><div>any</div></td>
   <td style="padding:5px"></td>
   <td style="padding:5px"></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`wrapperClassName`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"></td>
   <td style="padding:5px"></td>
  </tr>
 </tbody>
</table>

---

### Types

Supports `select`, `textarea`, as well as standard HTML input types. `getValue()` returns an array for multiple select.

---

### Button Input Types

Form buttons are encapsulated by `ButtonInput`. Pass in `type="reset"` or `type="submit"`
to suit your needs. Styling is the same as `Button`.

---

### Add-ons

Use `addonBefore` and `addonAfter` for normal addons, `buttonBefore` and `buttonAfter` for
button addons. Exotic configurations may require some css on your side.

---

### Sizes

Use `bsSize` to change the size of inputs. 
It also works with addons and most other options.

---

### Validation

Set `bsStyle` to one of `success`, `warning` or `error`. Add `hasFeedback` to show glyphicon. Glyphicon may need additional styling if there is an add-on or no label.

---

### Horizontal forms

Use `labelClassName` and `wrapperClassName` properties to add col classes manually. 
`checkbox` and `radio` types need special treatment because label wraps input.

---

### Use as a wrapper

If `type` is not set, child element(s) will be rendered instead of an input element.
`getValue()` will not work when used this way.

---


<a href="http://react-bootstrap.github.io/components.html#input" target="_blank">More about Input</a>
