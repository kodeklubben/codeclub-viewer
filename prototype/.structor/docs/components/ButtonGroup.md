## Button Groups

Group a series of buttons together on a single line with the button group.

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
   <td style="padding:5px"><span>`block`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px">false</td>
   <td style="padding:5px"><div><p>Display block buttons, only useful when used with the `vertical` prop.</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`bsSize`</span><span> </span></td>
   <td style="padding:5px"><div>one of: `xsmall` or `xs`, `small` or `sm`,`medium` or `md`, `large` or `lg`</div></td>
   <td style="padding:5px"></td>
   <td style="padding:5px"><div><p>Size variants</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`bsStyle`</span><span> </span></td>
   <td style="padding:5px"><div>one of: `default`, `primary`, `success`, `info`, `warning`, `danger`, `link`</div></td>
   <td style="padding:5px"></td>
   <td style="padding:5px"><div><p>Style variants</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`justified`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div><p>Make a group of buttons stretch at equal sizes to span the entire width of its parent</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`vertical`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div><p>Make a set of buttons appear vertically stacked rather than horizontally</p></div></td>
  </tr>
  
 </tbody>
</table>


---

### Example

    {
     "vertical": "true",
     "block": "true",
     "bsSize": "sm",
     "bsStyle": "info"
    }

---

#### Basics

`<ButtonGroup />` wrap a series of `<Button />`s.

#### Buttons Toolbars

Combine sets of `<ButtonGroup />`s into a `<ButtonToolbar />` for more complex components.

#### Nesting

You can place other button types within the `<ButtonGroup />` like `<DropdownButton />`s.

#### Vertical variants

Make a set of buttons appear vertically stacked rather than horizontally. Split button dropdowns are not supported here.

Just add `vertical` to the `<ButtonGroup />`.

Moreover, you can have buttons be block level elements so they take the full width of their container, just add `block` to the `<ButtonGroup />`, in addition to the `vertical`.

#### Justified button groups

Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.

> **Style issues**

> There are some issues and workarounds required when using this property, please see [bootstrap’s button group docs](http://getbootstrap.com/components/#btn-groups-justified) for more specifics.

Just add justified to the `<ButtonGroup />`.

<a href="http://react-bootstrap.github.io/components.html#btn-groups" target="_blank">More about Buttons Groups</a>
