## Panel

While not always necessary, sometimes you need to put your DOM in a box. For those situations, try the panel component.

By default, all the `<Panel />` does is apply some basic border and padding to contain some content.

You can pass on any additional properties you need, e.g. a custom `onClick` handler. They all will apply to the wrapper `div` element.

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
   <td style="padding:5px"><span>`bsSize`</span><span> </span></td>
   <td style="padding:5px"><div>one of: `xsmall` or `xs`, `small` or `sm`,`medium` or `md`, `large` or `lg`</div></td>
   <td style="padding:5px"></td>
   <td style="padding:5px"><div><p>Size variants</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`bsStyle`</span><span> </span></td>
   <td style="padding:5px"><div>one of: `default`, `primary`, `success`, `info`, `warning`, `danger`, `link`</div></td>
   <td style="padding:5px"><div>default</div></td>
   <td style="padding:5px"><div><p>Style variants</p></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`collapsible`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div>makes Panel collapsible</div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`defaultExpanded`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div>false</div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`eventKeyf`</span><span> </span></td>
   <td style="padding:5px"><div>any</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`expanded`</span><span> </span></td>
   <td style="padding:5px"><div>boolean</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`footer`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div>Pass buttons or secondary text in the footer prop. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.</div></td>
  </tr>
  
  
  <tr>
   <td style="padding:5px"><span>`header`</span><span> </span></td>
   <td style="padding:5px"><div>node</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div>adds header to your Panel</div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`headerRole`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`id`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`onSelect`</span><span> </span></td>
   <td style="padding:5px"><div>function</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
  <tr>
   <td style="padding:5px"><span>`panelRole`</span><span> </span></td>
   <td style="padding:5px"><div>string</div></td>
   <td style="padding:5px"><div></div></td>
   <td style="padding:5px"><div></div></td>
  </tr>
 </tbody>
</table>


---

#### With tables and list groups

Add the fill prop to `<Table />` or `<ListGroup />` elements to make them fill the panel.

---


<a href="http://react-bootstrap.github.io/components.html#panels" target="_blank">More about Panels</a>