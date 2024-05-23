Add config files here for blocks. These should contain the following things:

- schema for in CMS
- default values
- schema for all possible props, cms and defaults combined

Each block should have it's own config file, because this aligns with how astro and markdown workk; they utilize folder structure.
We might need a folder for 'hero' for example, to add all possible hero's.


example:
Hero component should choose which hero. Could also be a local hero. similar behaviour as blocks, but then only hero's.
