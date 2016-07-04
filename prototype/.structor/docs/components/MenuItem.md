## Menu Item

This is a component used in other components (see Buttons, Navbars).

It supports the basic anchor properties `href`, `target`, `title`.

It also supports different properties of the normal Bootstrap MenuItem.

* `header` - To add a header label to sections
* `divider` - Adds an horizontal divider between sections
* `disabled` - shows the item as disabled, and prevents the onclick
* `eventKey` - passed to the callback
* `onSelect` - a callback that is called when the user clicks the item.

The callback is called with the following arguments: `eventKey`, `href` and `target`

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
   <td style="padding:5px"><span>`disablede`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`divider`</span><span> </span></td>
   <td style="padding:5px"><div>all</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`eventKeyn`</span><span> </span></td>
   <td style="padding:5px"><div>number | string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`header`</span><span> </span></td>
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
   <td style="padding:5px"><span>`id`</span><span> </span></td>
   <td style="padding:5px"><div>string | number</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`onKeyDown`</span><span> </span></td>
   <td style="padding:5px"><div>function</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`onSelect`</td>
   <td style="padding:5px"><div>function</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  
   <td style="padding:5px"><span>`target`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`title`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
 </tbody>
</table>


---

<a href="http://react-bootstrap.github.io/components.html#menu-item" target="_blank">More about Menu Item</a>