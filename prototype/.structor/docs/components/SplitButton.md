## Split button dropdowns

Use `<DropdownButton />` or `<SplitButton />` components to display a button with a dropdown menu.

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
   <td style="padding:5px"><span>`bsSize`</span><span> </span></td>
   <td style="padding:5px"><div>one of: `xsmall` or `xs`, `small` or `sm`,`medium` or `md`, `large` or `lg`</div></td>
   <td style="padding:5px"></td>
   <td style="padding:5px"><div><p>Size variants</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`bsStyle`</span><span> </span></td>
   <td style="padding:5px"><div>one of: `default`, `primary`, `success`, `info`, `warning`, `danger`, `link`</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div><p>Style variants</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`children`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div><p>The children of a Dropdown may be a `<Dropdown.Toggle/>` or a `<Dropdown.Menu/>`</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`componentClass`</span><span> </span></td>
   <td style="padding:5px"><div>elementType</div></td>
   <td style="padding:5px"><div>ButtonGroup</div></td>
   <td style="padding:5px"><div><p></p></div></td>
  </tr>
  
  <tr>
   <td style="padding:5px"><span>`disabled`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div><p>Whether or not component is disabled.</p></div></td>
  </tr>
  
  <tr>
   <td style="padding:5px"><span>`dropup`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`href`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`id` **required**</span><span> </span></td>
   <td style="padding:5px"><div>string|number</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div><p>An html id attribute, necessary for assistive technologies, such as screen readers.</p></div></td>
  </tr>
  <td style="padding:5px"><span>`onClose`</span><span> </span></td>
   <td style="padding:5px"><div>function</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div><p>A callback fired when the Dropdown closes.</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`onSelect`</span><span> </span></td>
   <td style="padding:5px"><div>function</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div>A callback fired when a menu item is selected. <br>`function(Object event, Any eventKey)`</div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`onToggle`</span><span> </span></td>
   <td style="padding:5px"><div>function</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div> *controls* `open` <br>A callback fired when the Dropdown wishes to change visibility. Called with the requested open value.
<br>`function(Boolean isOpen){}`</div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`open`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div> *controlled by: `onToggle`, initial prop: `defaultOpen`* <br>Whether or not the Dropdown is visible.</div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`pullRight`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`target`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`title` **required**</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
 </tbody>
</table>

---

<a href="http://react-bootstrap.github.io/components.html#btn-dropdowns" target="_blank">More about SplitButton Dropdowns</a>
