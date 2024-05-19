# Chores
- Apply props gutter, which controls the outer padding/margin. Now is frame: panel/fill/viewport
- Apply props spacer, which controls the margin between children. Now is always enabled, but should be optional: none, components, prose (probably not needed with prose and writeup component. This whole prop might be skipped)
- Should be renamed to 'containers', because 'layouts' are used used for collections.


# New components
- Prose (for articles etc. Should apply styling to non-component html elements)
- Writeup (for small content areas, like in a section. Should apply styling to non-component html elements)
- Field (for form fields with label etc. Should adapt based on the element, like horizontal for checkboxes)

## Low priority
- Toast
- Modal
- Drawer
- Alert
- Tooltip
- Legal
- Banner